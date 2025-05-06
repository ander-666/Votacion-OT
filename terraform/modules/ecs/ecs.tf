#########################################
# 0) Provider & Variables
#########################################
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 4.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

variable "ecs_task_execution_role_arn" {
  type        = string
  description = "ARN of the IAM Role for ECS task execution"
}

#########################################
# 1) CloudWatch Log Groups
#########################################
resource "aws_cloudwatch_log_group" "frontend" {
  name              = "/ecs/frontend"
  retention_in_days = 14
}

resource "aws_cloudwatch_log_group" "backend" {
  name              = "/ecs/backend"
  retention_in_days = 14
}

resource "aws_cloudwatch_log_group" "kong" {
  name              = "/ecs/kong"
  retention_in_days = 14
}

resource "aws_cloudwatch_log_group" "kong_setup" {
  name              = "/ecs/kong-setup"
  retention_in_days = 14
}

resource "aws_cloudwatch_log_group" "kong_migrations" {
  name              = "/ecs/kong-migrations"
  retention_in_days = 14
}

resource "aws_cloudwatch_log_group" "keycloak" {
  name              = "/ecs/keycloak"
  retention_in_days = 14
}

#########################################
# 2) ECS Cluster
#########################################
resource "aws_ecs_cluster" "micro" {
  name = var.ecs_cluster_name
}

#########################################
# 3) Task Definitions (Fargate)
#########################################

resource "aws_ecs_task_definition" "frontend" {
  family                   = "frontend"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = var.ecs_task_execution_role_arn

  container_definitions = jsonencode([
    {
      name      = "frontend"
      image     = "${var.ecr_frontend_image}:${var.ecr_frontend_image_tag}"
      essential = true
      portMappings = [
        {
          containerPort = var.frontend_container_port
          protocol      = "tcp"
        }
      ]
      environment = [
        { name = "VITE_KONG_ADDRESS", value = "http://${var.dns_name}:8000" },
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = aws_cloudwatch_log_group.frontend.name
          awslogs-region        = var.aws_region
          awslogs-stream-prefix = "frontend"
        }
      }
    }
  ])
}

resource "aws_ecs_task_definition" "backend" {
  family                   = "backend"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = var.ecs_task_execution_role_arn

  container_definitions = jsonencode([
    {
      name      = "backend"
      image     = "${var.ecr_backend_image}:${var.ecr_backend_image_tag}"
      essential = true
      portMappings = [
        {
          containerPort = var.backend_container_port
          protocol      = "tcp"
        }
      ]
      environment = [
        { name = "DB_HOST", value = var.rds_instance_data }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = aws_cloudwatch_log_group.backend.name
          awslogs-region        = var.aws_region
          awslogs-stream-prefix = "backend"
        }
      }
    }
  ])
}

resource "aws_ecs_task_definition" "kong" {
  family                   = "kong"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "512"
  memory                   = "1024"
  execution_role_arn       = var.ecs_task_execution_role_arn

  container_definitions = jsonencode([
    {
      name      = "kong"
      image     = "${var.ecr_kong_image}:${var.ecr_kong_image_tag}"
      essential = true

      # Health check para validar que Kong esté listo
      healthCheck = {
        command     = ["CMD", "kong", "health", "ready"]
        interval    = 10
        timeout     = 5
        retries     = 5
        startPeriod = 180
      }

      portMappings = [
        {
          containerPort = var.kong_container_port
          protocol      = "tcp"
        },
        {
          containerPort = 8001
          protocol      = "tcp"
        }
      ]
      environment = [
        { name = "KONG_DATABASE", value = "postgres" },
        { name = "KONG_PG_HOST", value = var.rds_instance_data },
        { name = "KONG_PG_USER", value = "kong_user" },
        { name = "KONG_PLUGINS", value = "bundled,oidc" },
        { name = "KONG_PG_PASSWORD", value = "kong_secure_password" },
        { name = "KONG_PG_DATABASE", value = "kong_db" },
        { name = "KONG_PROXY_ACCESS_LOG", value = "/dev/stdout" },
        { name = "KONG_ADMIN_ACCESS_LOG", value = "/dev/stdout" },
        { name = "KONG_PROXY_ERROR_LOG", value = "/dev/stderr" },
        { name = "KONG_ADMIN_ERROR_LOG", value = "/dev/stderr" },
        { name = "KONG_ADMIN_LISTEN", value = "0.0.0.0:8001" },
        { name = "KONG_PROXY_LISTEN", value = "0.0.0.0:8000" },
        { name = "BACKEND_URL", value = var.dns_name },
        { name = "KONG_URL", value = "http://${var.dns_name}:8000" },
        { name = "KONG_ADMIN_URL", value = "http://${var.dns_name}:8001" },
        { name = "KEYCLOAK_URL", value = "http://${var.dns_name}:8180/realms/votacion_ot" },
        { name = "KONG_PG_SSL", value = "on" },        # hace sslmode=require
        { name = "KONG_PG_SSL_VERIFY", value = "off" } # no verifica el certificado
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = aws_cloudwatch_log_group.kong.name
          awslogs-region        = var.aws_region
          awslogs-stream-prefix = "kong"
        }
      }
    },
    {
      name       = "kong-setup"
      image      = "${var.ecr_kong_setup_image}:latest"
      essential  = false
      entryPoint = ["/bin/sh"]
      command    = ["-c", "echo 'Waiting for Kong to be healthy...' && sleep 5 && echo 'Executing setup script...' && /scripts/setup-kong-db.sh"]
      dependsOn = [
        {
          containerName = "kong",
          condition     = "HEALTHY"
        }
      ]
      environment = [
        { name = "KONG_ADMIN_URL", value = "http://${var.dns_name}:8001" },
        { name = "KONG_PROXY_URL", value = "http://${var.dns_name}:8000" },
        { name = "BACKEND_URL", value = "http://${var.dns_name}:8080" },
        { name = "KEYCLOAK_URL", value = "http://${var.dns_name}:8180" },
        { name = "KEYCLOAK_URL_REALMS", value = "http://${var.dns_name}:8180/realms/votacion_ot" }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = aws_cloudwatch_log_group.kong_setup.name
          awslogs-region        = var.aws_region
          awslogs-stream-prefix = "kong-setup"
        }
      }
    }
  ])
}

resource "aws_ecs_task_definition" "keycloak" {
  family                   = "keycloak"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "512"
  memory                   = "1024"
  execution_role_arn       = var.ecs_task_execution_role_arn

  container_definitions = jsonencode([
    {
      name      = "keycloak"
      image     = "${var.ecr_keyclok_setup_image}:latest"
      essential = true

      portMappings = [
        {
          containerPort = 8180
          protocol      = "tcp"
        }
      ]

      environment = [
        { name = "KEYCLOAK_ADMIN", value = "user" },
        { name = "KEYCLOAK_ADMIN_PASSWORD", value = "password" },
        { name = "KC_DB", value = "postgres" },
        { name = "KC_DB_URL_HOST", value = var.rds_instance_data },
        { name = "KC_DB_URL_PORT", value = "5432" },
        { name = "KC_DB_URL_DATABASE", value = "keycloak_db" },
        { name = "KC_DB_USERNAME", value = "keycloak_user" },
        { name = "KC_DB_PASSWORD", value = "keycloak_secure_password" },
        { name = "KC_DB_SCHEMA", value = "public" },
        { name = "KC_DB_SCHEMA_UPDATE", value = "auto" },
        { name = "KC_HTTP_PORT", value = "8180" },
        { name = "KC_HEALTH_ENABLED", value = "true" },
        { name = "KEYCLOAK_IMPORT", value = "/opt/keycloak/data/import/keycloak-realm.json" },
        { name = "KONG_URL", value = var.dns_name },
      ]

      command = ["start-dev", "--verbose", "--import-realm"]

      healthCheck = {
        command     = ["CMD-SHELL", "curl -f http://localhost:8180/health/ready || exit 1"]
        interval    = 10
        retries     = 10
        startPeriod = 60
        timeout     = 5
      }

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = aws_cloudwatch_log_group.keycloak.name
          awslogs-region        = var.aws_region
          awslogs-stream-prefix = "keycloak"
        }
      }
    }
  ])
}

resource "aws_ecs_task_definition" "kong_migrations" {
  family                   = "kong-migrations"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = var.ecs_task_execution_role_arn

  container_definitions = jsonencode([
    {
      name      = "kong-migrations"
      image     = "kong/kong:3.4.0"
      essential = true

      command = ["kong", "migrations", "bootstrap"]

      environment = [
        { name = "KONG_DATABASE", value = "postgres" },
        { name = "KONG_PG_HOST", value = var.rds_instance_data },
        { name = "KONG_PG_USER", value = "kong_user" },
        { name = "KONG_PG_PASSWORD", value = "kong_secure_password" },
        { name = "KONG_PG_DATABASE", value = "kong_db" },
        { name = "KONG_PG_SSL", value = "on" },        # hace sslmode=require
        { name = "KONG_PG_SSL_VERIFY", value = "off" } # no verifica el certificado
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = aws_cloudwatch_log_group.kong_migrations.name
          awslogs-region        = var.aws_region
          awslogs-stream-prefix = "kong-migrations"
        }
      }
    }
  ])
}

#########################################
# 5) Services (Fargate) without Cloud Map
#########################################

resource "aws_ecs_service" "frontend" {
  name            = "frontend"
  cluster         = aws_ecs_cluster.micro.id
  task_definition = aws_ecs_task_definition.frontend.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = var.subnet_ids
    security_groups  = [var.ecs_sg_id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = var.lb_target_group_frontend
    container_name   = "frontend"
    container_port   = var.frontend_container_port
  }
  depends_on = [aws_ecs_service.backend]

}

resource "aws_ecs_service" "backend" {
  name            = "backend"
  cluster         = aws_ecs_cluster.micro.id
  task_definition = aws_ecs_task_definition.backend.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = var.subnet_ids
    security_groups  = [var.ecs_sg_id]
    assign_public_ip = true
  }
  load_balancer {
    target_group_arn = var.lb_target_group_backend
    container_name   = "backend"
    container_port   = var.backend_container_port
  }
}

resource "aws_ecs_service" "kong" {
  name                 = "kong"
  cluster              = aws_ecs_cluster.micro.id
  task_definition      = aws_ecs_task_definition.kong.arn
  desired_count        = 1
  launch_type          = "FARGATE"
  force_new_deployment = true

  network_configuration {
    subnets          = var.subnet_ids
    security_groups  = [var.ecs_sg_id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = var.lb_target_group_kong
    container_name   = "kong"
    container_port   = var.kong_container_port
  }

  # Admin API (8001)
  load_balancer {
    target_group_arn = var.lb_target_group_kong_admin
    container_name   = "kong"
    container_port   = 8001
  }
}

resource "aws_ecs_service" "keycloak" {
  name            = "keycloak"
  cluster         = aws_ecs_cluster.micro.id
  task_definition = aws_ecs_task_definition.keycloak.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = var.subnet_ids
    security_groups  = [var.ecs_sg_id]
    assign_public_ip = true
  }
  load_balancer {
    target_group_arn = var.lb_target_group_keycloak
    container_name   = "keycloak"
    container_port   = 8180
  }
}

resource "aws_ecs_service" "kong_migrations" {
  name            = "kong-migrations"
  cluster         = aws_ecs_cluster.micro.id
  task_definition = aws_ecs_task_definition.kong_migrations.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = var.subnet_ids
    security_groups  = [var.ecs_sg_id]
    assign_public_ip = true
  }
}
