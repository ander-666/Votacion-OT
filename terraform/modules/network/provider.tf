##################################
# 🟩 AWS Provider Configuration
##################################

# Proveedor de AWS
provider "aws" {
  alias      = "us_east_1"
  region     = var.aws_region
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key

  # Habilitar la opción de obtener credenciales a través de la CLI si es necesario
  # Si las variables de acceso no se pasan, puede tomar las credenciales desde el perfil predeterminado de AWS CLI
  # profile    = "default"
}
