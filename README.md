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

| Carpeta / Archivo        | Descripción                                                                 |
|--------------------------|-----------------------------------------------------------------------------|
| `backend/`               | Aplicación Spring Boot con controladores, entidades y repositorios          |
| `frontend/`              | Aplicación React con sistema de votación, autenticación y resultados        |
| `db/`                    | Configuración y migraciones de la base de datos PostgreSQL                  |
| `keycloak/`              | Realm importable con configuración predefinida para Keycloak                |
| `kong/`                  | Configuración declarativa para el API Gateway Kong                          |
| `docker-compose.yml`     | Orquestador de todos los servicios del sistema                              |


## 🔐 Autenticación (Keycloak)

La aplicación usa Keycloak como proveedor de identidad. Cada usuario debe iniciar sesión antes de poder votar. La autenticación se realiza mediante OIDC, y una vez autenticado, el usuario puede acceder a todas las funcionalidades protegidas del sistema.

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

## 🧪 Cómo ejecutar el proyecto

Más información en:

https://github.com/ander-666/Votacion-OT/wiki/Configuraci%C3%B3n-y-Despliegue


## 📚 Wiki del proyecto
Aquí puedes encontrar documentación adicional, ejemplos y detalles del despliegue y configuración:

https://github.com/ander-666/Votacion-OT/wiki
