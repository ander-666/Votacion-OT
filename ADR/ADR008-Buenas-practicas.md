# [Metodologia y buenas prácticas]
-   Estado: aceptada
-   Responsables: 
    - Sergio Villain
    - Samuel Gómez
    - Otilio Elcano
    - Ander Alonso
-   Fecha: 28/02/2025


Historia técnica: NA

## Contexto y Planteamiento del Problema

Para que la realizacion de un sistema de votacion se desarrolle de la forma mas rapida y fluida posible es necesario establecer una metodologia de trabajo concreta acompañada del seguimiento de buenas paracticas.

## Factores en la Decisión

* Agilidad en el desarrollo
* Minimizacion de errores y bugs
* Verificacion y evaluacion de las funcionalidades / codigo

## Opciones Consideradas

- **Utilizacion de pull request**
- **Utilizar estandares de codificación**
- **Seguridad**
- **Organización en sprints**
- **Gestión de ramas en git**
- **Analisis estático de código**
- **Analisis dinámico de código**
- **Coverage de tests unitarios**
- **Automatización de tests unitarios con git actions**
- **Utilización de un balanceador de carga**

## Decisión

 Opciónes elegidas: Utilización de pull request, seguridad, organización en sprints, gestión de ramas en git, análisis dinámico de código, coverage de test unitarios, automatización de test unitarios con git actions y utilización de un balanceador de carga. 

Las opciones de las buenas practicas elegidas se han seleccionado con el proposito de agilizar el desarrollo del codigo al mismo tiempo que se aumenta la seguridad, se optimiza el desarrollo y la operación del sistema, mejorando aspectos como la colaboración, calidad del código, seguridad, rendimiento y escalabilidad. De esta forma, se pueden desarrollar sistemas más robustos, eficientes y fáciles de mantener. Para ello se han omitido tambien practicas y mecanismos que suponen un coste "excesivo" en comparacion con la escala del proyecto.
### Consecuencias

-  **Positivas:**
    - El codigo desarrollado es mas limpio
    - Se llevan menos fallos y bugs a "produccion"
    - Se automatiza la ejecucion de tareas repetitivas
-  **Negativas:**
    - El desarrollo es mas lento durante el inicio
    - Una automatizacion excesiva puede provocar errores inesperados
    - La falta de verificacion humana puede derivar en la omision de errores

## Ventajas y Desventajas de las opciones

### Utilización de pull request

-   **Ventajas:**
    - Facilita la revisión de código antes de integrarlo al proyecto y detectar y corregir errores antes de la implementación final.
-   **Desventaja:**
    - Requiere una cultura de revisión bien establecida para ser efectiva.

### Seguridad

-   **Ventaja:**
    - Protege la integridad del sistema y evita vulnerabilidades.
-   **Desventaja:**
    - Implementar medidas de seguridad robustas puede aumentar el tiempo de desarrollo.


### Organización en sprints

-   **Ventaja:**
    - Divide el trabajo en ciclos cortos, permitiendo entregas iterativas y mejoras constantes.
-   **Desventaja:**
    - Requiere una buena coordinación entre los miembros del equipo


### Gestión de ramas en git

-   **Ventaja:**
    - Facilita el trabajo en paralelo sin afectar la rama principal.
-   **Desventaja:**
    - La mala gestión puede derivar en conflictos difíciles de resolver.

### Analisis estático de codigo

-   **Ventaja:**
    - Detecta errores tempranos en el desarrollo, reduciendo costos de corrección en fases posteriores.  
-   **Desventaja:**
    - Puede generar falsos positivos, lo que lleva a invertir tiempo en revisar problemas inexistentes.  
    
### Analisis dinámico de codigo

-   **Ventaja:**
    - Detecta errores en ejecución real, como problemas de memoria, rendimiento o seguridad.
-   **Desventaja:**
    - Puede ser más lento que el análisis estático porque requiere ejecutar el código.

### Coverage de tests unitarios

-   **Ventaja:**
    - Proporciona una métrica clara sobre qué partes del código están cubiertas por pruebas.
-   **Desventaja:**
    - Un alto porcentaje de cobertura no garantiza que el código esté libre de errores.

### Automatizacion de tests unitarios con git actions

-   **Ventaja:**
    - Permite detectar errores de manera temprana en cada Pull Request o cambio en el código.
-   **Desventaja:**
    - Puede ralentizar el pipeline si las pruebas no están optimizadas.

### Utilizar estandares de codificación

-   **Ventajas:**
    - Mejora la legibilidad y mantenibilidad del código.
-   **Desventajas:**
    - Puede generar resistencia si el equipo no está acostumbrado a seguir normas estrictas.
    
### Utilización de un balanceador de carga

-   **Ventaja:**
    - Mejora la escalabilidad y la tolerancia a fallos al distribuir la carga de trabajo de manera eficiente.
-   **Desventaja:**
    - Mayor complejidad en la infraestructura y configuración inicial.
