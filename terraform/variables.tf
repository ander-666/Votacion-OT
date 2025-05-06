##################################
# 🟩 AWS Configuration
##################################

variable "aws_region" {
  description = "Región de AWS donde se desplegará la infraestructura"
  type        = string
}

variable "aws_access_key" {
  description = "Access Key ID de AWS (solo para desarrollo local; usar secrets en producción)"
  type        = string
  sensitive   = true
}

variable "aws_secret_key" {
  description = "Secret Access Key de AWS (solo para desarrollo local; usar secrets en producción)"
  type        = string
  sensitive   = true
}

variable "aws_session_token" {
  description = "AWS Session Token (opcional, para sesiones temporales)"
  type        = string
  sensitive   = true
}

##################################
# 🐳 ECR Images
##################################

variable "ecr_frontend_image" {
  description = "Ruta completa a la imagen del frontend en ECR (sin tag)"
  type        = string
  default     = "664686881094.dkr.ecr.us-east-1.amazonaws.com/ot-votaciones"
}

variable "ecr_backend_image" {
  description = "Ruta completa a la imagen del backend en ECR (sin tag)"
  type        = string
  default     = "664686881094.dkr.ecr.us-east-1.amazonaws.com/ot_backend"
}
variable "ecr_kong_image" {
  description = "Ruta completa a la imagen del kong en ECR (sin tag)"
  type        = string
  default     = "664686881094.dkr.ecr.us-east-1.amazonaws.com/kong-config"
}

variable "ecr_kong_setup_image" {
  description = "Ruta completa a la imagen del kong setup en ECR"
  type        = string
  default     = "664686881094.dkr.ecr.us-east-1.amazonaws.com/kong-setup"
}
variable "ecr_keyclok_setup_image" {
  description = "Ruta completa a la imagen del backend en ECR (sin tag)"
  type        = string
  default     = "664686881094.dkr.ecr.us-east-1.amazonaws.com/keycloak-realm"
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

variable "ecr_kong_image_tag" {
  description = "Tag de la imagen del kong (ej: latest)"
  type        = string
  default     = "latest"
}
##################################
# 🔧 Container Configuration
##################################

# 🔹 Nombres
variable "frontend_container_name" {
  description = "Nombre del contenedor del frontend"
  type        = string
  default     = "frontend"
}

variable "backend_container_name" {
  description = "Nombre del contenedor del backend"
  type        = string
  default     = "backend"
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

# 🔹 Recursos
variable "frontend_container_memory" {
  description = "Memoria (en MB) para el contenedor frontend"
  type        = number
  default     = 512
}

variable "backend_container_memory" {
  description = "Memoria (en MB) para el contenedor backend"
  type        = number
  default     = 512
}

variable "frontend_container_cpu" {
  description = "Unidades de CPU para el contenedor frontend"
  type        = number
  default     = 256
}

variable "backend_container_cpu" {
  description = "Unidades de CPU para el contenedor backend"
  type        = number
  default     = 256
}

# 🔹 Escalado
variable "frontend_container_count" {
  description = "Número de instancias del contenedor frontend"
  type        = number
  default     = 1
}

variable "backend_container_count" {
  description = "Número de instancias del contenedor backend"
  type        = number
  default     = 1
}

# 🔹 Variables de entorno
variable "frontend_container_environment" {
  description = "Mapa de variables de entorno para el contenedor frontend"
  type        = map(string)
  default = {
    NODE_ENV = "production"
  }
}

variable "backend_container_environment" {
  description = "Mapa de variables de entorno para el contenedor backend"
  type        = map(string)
  default = {
    NODE_ENV = "production"
  }
}

variable "vpc_cidr" {
  description = "CIDR para la VPC principal"
  default     = "10.0.0.0/16"
}

variable "public_subnets" {
  description = "Lista de CIDR para subredes públicas"
  type        = list(string)
  default = [
    "10.0.1.0/24", # Zona A
    "10.0.2.0/24"  # Zona B
  ]
}

variable "availability_zones" {
  description = "Lista de zonas de disponibilidad"
  type        = list(string)
  default = [
    "us-east-1a",
    "us-east-1b"
  ]
}


##################################
# 📝 Logging
##################################

variable "frontend_container_log_group" {
  description = "Nombre del log group en CloudWatch para el frontend"
  type        = string
  default     = "/ecs/frontend"
}

variable "backend_container_log_group" {
  description = "Nombre del log group en CloudWatch para el backend"
  type        = string
  default     = "/ecs/backend"
}

variable "frontend_container_log_stream" {
  description = "Nombre del log stream en CloudWatch para el frontend"
  type        = string
  default     = "ecs-frontend"
}

variable "backend_container_log_stream" {
  description = "Nombre del log stream en CloudWatch para el backend"
  type        = string
  default     = "ecs-backend"
}

variable "db_name" {
  description = "Databasae namer for the backend"
  type        = string
  default     = "votacion_db"
}

variable "db_username" {
  description = "Databasae username for the backend"
  type        = string
  default     = "votacion_user"
}

variable "db_password" {
  description = "Databasae password for the backend"
  type        = string
  default     = "votacion_secure_password"
}

variable "ecs_task_execution_role_arn" {
  type        = string
  description = "ARN of the IAM Role for ECS task execution"
  default     = "arn:aws:iam::664686881094:role/LabRole"
}

# variable "aws_region" {
#   description = "Región AWS"
#   type        = string
# }

# variable "ecs_cluster_name" {
#   description = "Nombre del cluster ECS"
#   type        = string
# }

