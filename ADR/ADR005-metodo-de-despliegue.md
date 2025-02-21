# Metdo de despliegue local

* Estado: aceptada
* Responsables:
    - Sergio Villain
    - Samuel Gómez
    - Otilio Elcano
    - Ander Alonso
* Fecha: 2025/02/14

Historia técnica: NA

## Contexto y Planteamiento del Problema

El equipo necesita una forma sencilla de levantar el sistema en un entorno local para realizar pruebas de desarrollo sin necesidad de automatizar el proceso. La aplicación está basada en una arquitectura de microservicios utilizando Docker. Se requiere una solución que permita levantar rápidamente la aplicación en un entorno de pruebas local sin complicaciones adicionales.

## Factores en la Decisión

-  **Facilidad de uso:** La solución debe ser simple para el equipo de desarrollo sin necesidad de configuraciones complejas.
-  **Despliegue local:** No se busca un sistema automatizado, sino una forma de levantar el entorno de prueba rápidamente.
- **Compatibilidad con microservicios:** El sistema está basado en microservicios, por lo que la solución debe ser capaz de manejar múltiples contenedores Docker.
- **Requisitos mínimos:** La solución no debe requerir herramientas adicionales complejas para ejecutarse localmente.

## Opciones Consideradas

-  **Despliegue con Docker Compose**
-  **Despliegue manual sin Docker**
-  **Despliegue con Kubernetes local (Minikube)**

## Decisión

Opción elegida: **Despliegue con Docker Compose** , porque permite levantar de manera rápida y sencilla el entorno local de microservicios sin necesidad de configuraciones adicionales complejas.

### Consecuencias
-  **Positivas:**
    - La configuración es sencilla y rápida de ejecutar, ideal para entornos de desarrollo.
    - Docker Compose facilita la gestión de múltiples contenedores (microservicios) con un solo comando
    - Requiere pocos recursos y no necesita configuraciones avanzadas
    
-  **Negativas:**
    - Requiere tener Docker y Docker Compose instalados en el equipo local

## Ventajas y Desventajas de las opciones

### Despliegue con Docker Compose
Desplegar los distintos servicios del sistema en contenedores docker separados.

-   **Ventajas:**
    -   Docker Compose permite definir y ejecutar varios contenedores con un solo archivo de configuración (docker-compose.yml)
    -   Es rápido de configurar y usar para entornos de prueba local.
    -   No es necesario instalar herramientas adicionales más allá de Docker y Docker Compose

-   **Desventajas:**
    -   Se debe contar con Docker instalado y configurado en la máquina local
    -   Proporciona herramientas avanzadas como Kubernetes, pero no es necesario para este entorno de test local
    
### Despliegue Manual
Desplegar cada servicio de forma manual en un entorno local requiriendo las instalaciones necesarias.
-   **Ventajas:**
    -   No depende de herramientas externas, solo de las dependencias manuales

-   **Desventajas:**
    -   Gestionar cada servicio de forma manual puede ser complejo y lento
    -   No es escalable si se requieren más microservicios o cambios frecuentes en la configuración

### Despliegue con Kubernetes local (Minikube)
Desplegar los servicios en contenedores y utilizar un sistema de orquestación.
-   **Ventajas:**
    -   Kubernetes permite orquestar y gestionar microservicios con alta flexibilidad
     
-   **Desventajas:**
    -   Requiere una configuración compleja y herramientas adicionales como Minikube para ejecutar Kubernetes localmente
    -   Consumo de recursos más alto en comparación con Docker Compose
