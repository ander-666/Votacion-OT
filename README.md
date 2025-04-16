# 🗳️ Proyecto de Votación - Operación Triunfo (OT)

Este proyecto es una aplicación web full-stack que permite a los usuarios votar a sus participantes favoritos de Operación Triunfo. Combina tecnologías modernas para ofrecer una experiencia segura, escalable y fácil de usar.

---

## 🚀 Tecnologías utilizadas

- **Frontend**: React + Vite + Styled Components
- **Backend**: Spring Boot
- **Base de Datos**: PostgreSQL
- **Autenticación**: Keycloak
- **API Gateway**: Kong
- **Contenedores**: Docker + Docker Compose

---

## 📦 Estructura del Proyecto

├── backend/ # Aplicación Spring Boot con controladores, entidades, repositorios 
├── frontend/ # Aplicación React con sistema de votación, autenticación y resultados 
├── db/ # Configuración y migraciones de base de datos PostgreSQL 
├── keycloak/ # Realm importable con configuración predefinida de Keycloak 
├── kong/ # Configuración declarativa del API Gateway Kong ├── docker-compose.yml # Orquestador de todos los servicios del sistema


---

## 🔐 Autenticación (Keycloak)

La aplicación usa Keycloak como proveedor de identidad. Cada usuario debe iniciar sesión antes de poder votar. La autenticación se realiza mediante OIDC, y una vez autenticado, el usuario puede acceder a todas las funcionalidades protegidas del sistema.

### Ventajas:

- Login centralizado
- Roles gestionados desde Keycloak
- Sesiones persistentes
- Compatible con múltiples clientes

---

## 🗳️ Funcionalidad de Votación

Una vez autenticado, el usuario puede acceder a una galería de participantes. Al seleccionar uno:

1. Se abre un modal con la información del participante
2. Se permite votar por ese participante
3. El voto se registra con:
   - El ID del usuario autenticado (protegido)
   - El ID del participante
   - El ID de la gala actual

Si el usuario ya ha votado en esa gala, el backend lo bloquea y devuelve un mensaje informativo.

---

## 📊 Funcionalidad de Resultados

La vista de resultados permite mostrar, para cada gala, un gráfico de barras con los votos por participante.

- Se obtienen los datos mediante una llamada al backend `/votos`
- Se agrupan los votos por gala y participante
- Se genera un gráfico dinámico por gala usando Chart.js

---

## ⚖️ Escalabilidad

### Antes:
- Ya era escalable al estar basada en contenedores Docker
- PostgreSQL permite múltiples conexiones simultáneas y garantiza transacciones

### Ahora (mejoras):
- Se ha añadido **Kong como API Gateway** que centraliza todas las llamadas a los microservicios y gestiona la seguridad, autenticación y el control de acceso
- Se ha incorporado **Keycloak** como sistema de identidad centralizado, permitiendo login único en todo el sistema
- Toda la arquitectura está preparada para escalar horizontalmente

---

## 🧪 Cómo ejecutar el proyecto

### Requisitos:

- Docker y Docker Compose instalados

### Pasos:

## Clona el repositorio:

git clone https://github.com/ander-666/Votacion-OT.git
cd tu-repo

## Ejecuta los servicios:

docker-compose up --build

## Accede a la aplicación:

Frontend (React): http://localhost:8002

Keycloak Admin: http://localhost:8180

Usuario: user

Contraseña: password (o la definida en docker-compose)

Backend API: http://localhost:8001

Kong Gateway: http://localhost:8000

## Base de Datos
Se usa PostgreSQL con el esquema users

Tabla principal: votes

Columnas:

gala_id: bigint

votant_id: text

participant_id: bigint

vote_date: timestamp

## 📚 Wiki del proyecto
Aquí puedes encontrar documentación adicional, ejemplos y detalles del despliegue y configuración:

https://github.com/ander-666/Votacion-OT/wik
