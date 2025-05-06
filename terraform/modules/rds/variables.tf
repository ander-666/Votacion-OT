variable "db_identifier" {
  description = "Identificador de la instancia RDS existente"
  type        = string
  default     = "database-3"
}

variable "sgid_ecs" {
  description = "Identificador del Sg de ECS"
  type        = string
}


