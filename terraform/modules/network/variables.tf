##################################
# 🔧 Container Configuration
##################################

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

variable "vpc_cidr" {
  description = "CIDR para la VPC principal"
  default     = "10.0.0.0/16"
}

variable "public_subnets" {
  description = "Lista de CIDR para subredes publicas"
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

variable "rds_vpc" {
  description = "vpc of the rds database"
}


