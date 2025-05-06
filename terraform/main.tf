############################################
# Terraform y proveedor AWS
############################################
terraform {
  required_version = ">= 1.3"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  #
  # Opcional: backend remoto para el estado
  # backend "s3" {
  #   bucket = "mi-bucket-terraform-state"
  #   key    = "microservices/terraform.tfstate"
  #   region = "us-east-1"
  # }
}

provider "aws" {
  region     = var.aws_region
  access_key = var.aws_access_key # para uso local; en CI se usará un role/OIDC
  secret_key = var.aws_secret_key
  token      = var.aws_session_token
}

############################################
# 1️⃣  Red (VPC + subredes públicas)
############################################
module "network" {
  source = "./modules/network"

  vpc_cidr           = var.vpc_cidr
  public_subnets     = var.public_subnets
  availability_zones = var.availability_zones
  rds_vpc            = module.rds_database.rds_vpc_id
  # public_subnet_ids = module.
}

############################################
# 2️⃣  ECS (cluster + servicios frontend y backend)
############################################
module "ecs" {
  source = "./modules/ecs"

  # ----- red -----
  # vpc_id       = module.network.vpc_id
  vpc_id                      = module.rds_database.rds_vpc_id
  ecs_sg_id                   = module.network.ecs_sg_id # idem
  aws_region                  = var.aws_region
  subnet_ids                  = module.network.subnet_ids
  rds_database                = module.rds_database.rds_instance_data
  ecs_task_execution_role_arn = var.ecs_task_execution_role_arn
  ecr_frontend_image_tag      = var.ecr_frontend_image_tag
  ecr_backend_image_tag       = var.ecr_backend_image_tag
  ecr_kong_image_tag          = var.ecr_kong_image_tag
  dns_name                    = module.network.alb_dns_name
  lb_target_group_frontend    = module.network.tg_frontend_arn
  lb_target_group_backend     = module.network.tg_backend_arn
  lb_target_group_kong        = module.network.tg_kong_arn
  lb_target_group_keycloak    = module.network.tg_keycloak_arn
  lb_target_group_kong_admin  = module.network.tg_kong_admin_arn

  # ----- imágenes ECR -----
  ecr_frontend_image      = var.ecr_frontend_image
  ecr_backend_image       = var.ecr_backend_image
  ecr_kong_image          = var.ecr_kong_image
  ecr_kong_setup_image    = var.ecr_kong_setup_image
  ecr_keyclok_setup_image = var.ecr_keyclok_setup_image

  # ----- parámetros de contenedor -----
  frontend_container_port = var.frontend_container_port
  backend_container_port  = var.backend_container_port
  kong_container_port     = var.kong_container_port

  db_name           = var.db_name
  db_username       = var.db_username
  db_password       = var.db_password
  rds_instance_data = module.rds_database.rds_instance_data


  ecs_cluster_name = var.ecs_cluster_name
}

############################################
# 3️⃣  Load Balancer (ALB para el frontend)
############################################
module "load_balancer" {
  source = "./modules/load_balancer"

  vpc_id     = module.rds_database.rds_vpc_id
  ecs_sg_id  = module.network.ecs_sg_id
  subnet_ids = module.network.subnet_ids

}

############################################
# 3️⃣  Load Balancer (ALB para el frontend)
############################################
module "rds_database" {
  source = "./modules/rds"

  sgid_ecs = module.network.ecs_sg_id

}
