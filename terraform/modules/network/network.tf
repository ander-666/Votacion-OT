variable "public_subnet_tag_key" {
  description = "Tag key used to identify public subnets"
  type        = string
  default     = "Tier"
}

variable "public_subnet_tag_value" {
  description = "Tag value used to identify public subnets"
  type        = string
  default     = "public"
}

# Discover all public subnets by tag in the RDS VPC
data "aws_subnets" "public" {
  filter {
    name   = "vpc-id"
    values = [var.rds_vpc]
  }
}


# Read the IGW already attached to that VPC
data "aws_internet_gateway" "existing" {
  filter {
    name   = "attachment.vpc-id"
    values = [var.rds_vpc]
  }
}

# resource "aws_route_table" "public" {
#   vpc_id = var.rds_vpc
#   tags   = { Name = "public-rt" }
# }

# resource "aws_route" "public_internet_route" {
#   route_table_id         = aws_route_table.public.id
#   destination_cidr_block = "0.0.0.0/0"
#   gateway_id             = data.aws_internet_gateway.existing.id
# }

# Associate the route table with every public subnet
# resource "aws_route_table_association" "public" {
#   for_each       = toset(data.aws_subnets.public.ids)
#   subnet_id      = each.key
#   route_table_id = aws_route_table.public.id
# }

# ECS Security Group in the same VPC
resource "aws_security_group" "ecs_sg" {
  name        = "ecs-sg"
  description = "Security group for ECS containers"
  vpc_id      = var.rds_vpc

  # —————————————— Exposición pública (igual que antes) ——————————————
  ingress {
    description = "Allow HTTP to frontend container"
    from_port   = var.frontend_container_port
    to_port     = var.frontend_container_port
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Allow TCP to backend container"
    from_port   = var.backend_container_port
    to_port     = var.backend_container_port
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Allow TCP to kong proxy"
    from_port   = var.kong_container_port
    to_port     = var.kong_container_port
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Allow TCP to kong proxy admin API"
    from_port   = var.kong_container_port_opcional
    to_port     = var.kong_container_port_opcional
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Allow TCP to Keycloak"
    from_port   = 8180
    to_port     = 8180
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }


  # —————————————— Comunicación interna ——————————————
  ingress {
    description = "Allow all traffic between ECS tasks in this SG"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    self        = true
  }

  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}


# Outputs for other modules to consume
output "ecs_sg_id" {
  description = "ID of the ECS security group"
  value       = aws_security_group.ecs_sg.id
}

output "igw_id" {
  description = "ID of the Internet Gateway attached to the VPC"
  value       = data.aws_internet_gateway.existing.id
}

# output "public_route_table_id" {
#   description = "ID of the public route table"
#   value       = aws_route_table.public.id
# }

output "subnet_ids" {
  description = "List of public subnet IDs discovered"
  value       = data.aws_subnets.public.ids
}


#########################################
# 4) Security Group para el ALB interno
#########################################
resource "aws_security_group" "alb" {
  name        = "alb-sg"
  description = "SG para el ALB interno"
  vpc_id      = var.rds_vpc

  # HTTP interno desde toda la VPC (o ajustar CIDR a tu red)
  ingress {
    description = "HTTP interno"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTP interno"
    from_port   = 8000
    to_port     = 8000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTP interno"
    from_port   = 8001
    to_port     = 8001
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTP interno"
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "DNS interno"
    from_port   = 53
    to_port     = 53
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Keycloak interno"
    from_port   = 8180
    to_port     = 8180
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Salida libre hacia cualquier lado (el ALB hablará con los TGs)
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

#########################################
# 5) Application Load Balancer interno
#########################################
resource "aws_lb" "internal" {
  name               = "container-alb"
  internal           = true
  load_balancer_type = "application"
  subnets            = data.aws_subnets.public.ids
  security_groups    = [aws_security_group.alb.id]
}

#########################################
# 6) Target Groups por micro‑servicio
#########################################
# FRONTEND
resource "aws_lb_target_group" "frontend" {
  name        = "tg-frontend"
  port        = var.frontend_container_port
  protocol    = "HTTP"
  vpc_id      = var.rds_vpc
  target_type = "ip"

  health_check {
    path                = "/"
    matcher             = "200-399"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 3
  }
}

# BACKEND
resource "aws_lb_target_group" "backend" {
  name        = "tg-backend"
  port        = var.backend_container_port
  protocol    = "HTTP"
  vpc_id      = var.rds_vpc
  target_type = "ip"

  health_check {
    path                = "/swagger-ui/index.html"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 3
  }
}

# KONG
resource "aws_lb_target_group" "kong" {
  name        = "tg-kong"
  port        = 8000
  protocol    = "HTTP"
  vpc_id      = var.rds_vpc
  target_type = "ip"

  health_check {
    path                = "/free"
    matcher             = "200-399"
    interval            = 10
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 5
  }
}

resource "aws_lb_target_group" "kong_admin" {
  name        = "tg-kong-admin"
  port        = 8001
  protocol    = "HTTP"
  vpc_id      = var.rds_vpc
  target_type = "ip"

  health_check {
    path                = "/status"
    interval            = 10
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 5
  }
}

# KEYCLOAK
resource "aws_lb_target_group" "keycloak" {
  name        = "tg-keycloak"
  port        = 8180
  protocol    = "HTTP"
  vpc_id      = var.rds_vpc
  target_type = "ip"

  health_check {
    path                = "/health/live"
    matcher             = "200-499" # acepta cualquier 2xx o 3xx
    interval            = 10
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 5
  }
}

# FRONTEND en puerto 80
resource "aws_lb_listener" "frontend" {
  load_balancer_arn = aws_lb.internal.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.frontend.arn
  }
}

# BACKEND en puerto 8080
resource "aws_lb_listener" "backend" {
  load_balancer_arn = aws_lb.internal.arn
  port              = 8080
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.backend.arn
  }
}

# KONG Proxy en puerto 8000
resource "aws_lb_listener" "kong_proxy" {
  load_balancer_arn = aws_lb.internal.arn
  port              = 8000
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.kong.arn
  }
}

# KONG Proxy en puerto 8000
resource "aws_lb_listener" "kong_proxy_admin" {
  load_balancer_arn = aws_lb.internal.arn
  port              = 8001
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.kong_admin.arn
  }
}

# KEYCLOAK en puerto 8180
resource "aws_lb_listener" "keycloak" {
  load_balancer_arn = aws_lb.internal.arn
  port              = 8180
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.keycloak.arn
  }
}


output "alb_dns_name" {
  description = "DNS interno del ALB"
  value       = aws_lb.internal.dns_name
}

output "tg_frontend_arn" {
  description = "ARN del target group frontend"
  value       = aws_lb_target_group.frontend.arn
}

output "tg_backend_arn" {
  description = "ARN del target group backend"
  value       = aws_lb_target_group.backend.arn
}

output "tg_kong_arn" {
  description = "ARN del target group kong"
  value       = aws_lb_target_group.kong.arn
}

output "tg_kong_admin_arn" {
  description = "ARN del target group kong admin"
  value       = aws_lb_target_group.kong_admin.arn
}

output "tg_keycloak_arn" {
  description = "ARN del target group keycloak"
  value       = aws_lb_target_group.keycloak.arn
}
