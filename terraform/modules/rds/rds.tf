data "aws_db_instance" "mi_rds" {
  db_instance_identifier = var.db_identifier
}

# “Importas” el SG usando directamente el string
data "aws_security_group" "sg_rds" {
  id = data.aws_db_instance.mi_rds.vpc_security_groups[0]
}

data "aws_db_subnet_group" "rds_subnet_group" {
  # Leemos el subnet group que usa tu RDS
  name = data.aws_db_instance.mi_rds.db_subnet_group
}

resource "aws_security_group_rule" "rds_ingress" {
  type                     = "ingress"
  from_port                = data.aws_db_instance.mi_rds.port
  to_port                  = data.aws_db_instance.mi_rds.port
  protocol                 = "tcp"
  security_group_id        = data.aws_security_group.sg_rds.id
  source_security_group_id = var.sgid_ecs
}

output "rds_instance_data" {
  description = "Lista de IDs de subredes públicas"
  value       = data.aws_db_instance.mi_rds.address
}
output "rds_vpc_id" {
  description = "vpc id for the RDS database"
  value       = data.aws_db_subnet_group.rds_subnet_group.vpc_id
}
