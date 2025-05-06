##################################
# 🟩 AWS Configuration
##################################

variable "aws_region" {
  description = "Region de AWS donde se desplegara la infraestructura"
  type        = string
}

##################################
# 🐳 ECR Images
##################################

variable "ecr_frontend_image" {
  description = "Ruta completa a la imagen del frontend en ECR (sin tag)"
  type        = string
}

variable "ecr_backend_image" {
  description = "Ruta completa a la imagen del backend en ECR (sin tag)"
  type        = string
}

variable "ecr_kong_image" {
  description = "Ruta completa a la imagen del kong en ECR (sin tag)"
  type        = string
}

variable "ecr_kong_setup_image" {
  description = "Ruta completa a la imagen del kong setup en ECR"
  type        = string
}

variable "ecr_kong_image_tag" {
  description = "Tag de la imagen del kong (ej: latest)"
  type        = string
}
variable "ecr_keyclok_setup_image" {
  description = "Tag de la imagen del keyclok (ej: latest)"
  type        = string
}
variable "dns_name" {
  description = "DNS internoi de ALB"
  type        = string
}
variable "lb_target_group_backend" {
  description = "Target group del balanceador interno "
  type        = string
}
variable "lb_target_group_frontend" {
  description = "Target group del balanceador interno "
  type        = string
}
variable "lb_target_group_kong" {
  description = "Target group del balanceador interno "
  type        = string
}
variable "lb_target_group_keycloak" {
  description = "Target group del balanceador interno "
  type        = string
}
variable "lb_target_group_kong_admin" {
  description = "Target group del balanceador interno "
  type        = string
}

##################################
# 🔧 Container Configuration
##################################

# 🔹 Nombres

variable "vpc_id" {
  description = "Id de VPC"
  type        = string
}
variable "ecs_sg_id" {
  description = "Security Group de ECS"
  type        = string
}

# 🔹 Puertos
variable "frontend_container_port" {
  description = "Puerto expuesto por el contenedor frontend"
  type        = number
  default     = 80
}

variable "backend_container_port" {
  description = "Puerto expuesto por el contenedor backend"
  type        = number
  default     = 8080
}

variable "kong_container_port" {
  description = "Puerto expuesto por el contenedor kong"
  type        = number
  default     = 8000
}

variable "kong_container_port_opcional" {
  description = "Puerto expuesto por el contenedor kong"
  type        = number
  default     = 8001
}

variable "ecs_cluster_name" {
  description = "Nombre del cluster de ECS"
  type        = string
  default     = "microservices-cluster"
}

variable "subnet_ids" {
  description = "List of subnet IDs for ECS service and EC2"
  type        = list(string)
}

variable "rds_database" {
  description = "Data about the rds database"
}

variable "db_name" {
  description = "Databasae namer for the backend"
  type        = string
}

variable "db_username" {
  description = "Databasae username for the backend"
  type        = string
}

variable "db_password" {
  description = "Databasae password for the backend"
  type        = string
}

variable "rds_instance_data" {
  description = "Database adress in aws"
  type        = string
}

variable "ecr_frontend_image_tag" {
  description = "Tag de la imagen del frontend (ej: latest)"
  type        = string
  default     = "latest"
}

variable "ecr_backend_image_tag" {
  description = "Tag de la imagen del backend (ej: latest)"
  type        = string
  default     = "latest"
}


