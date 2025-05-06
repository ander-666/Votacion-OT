##################################
# 🔧 Container Configuration
##################################

variable "vpc_id" {
  description = "Id de VPC"
  type        = string
}

variable "ecs_sg_id" {
  description = "Id de VPC"
  type        = string
}

variable "subnet_ids" {
  description = "Ids de subnets"
  type        = set(string)
}
