# Integración continua
-   Estado: aceptada
-   Responsables: 
    - Sergio Villain
    - Samuel Gómez
    - Otilio Elcano
    - Ander Alonso
-   Fecha: 14/03/2025


Historia técnica: N/A

## Contexto y Planteamiento del Problema

Para que la realizacion de un sistema de votacion se desarrolle de la forma mas rapida y fluida posible es necesario establecer una metodologia de trabajo concreta acompañada del seguimiento de buenas paracticas. La ejecucion de estas buenas practicas se lleva a cabo mediante metodos de integracion continua que garanticen el cumpleimendto del codigo integrado para con las buenas practicas establecidas.

## Factores en la Decisión

* Agilidad en el desarrollo
* Minimizacion de errores y bugs
* Verificacion y evaluacion de las funcionalidades / codigo

## Opciones Consideradas

- **Análisis estático de código**
- **Análisis dinámico de código**
- **Coverage de tests unitarios**
- **Automatización de tests unitarios con git actions**
- **Análisis de dependencias**

## Decisión

 Opciónes elegidas: Análisis estático de código, coverage de test unitarios, automatización de test unitarios. Todo ello se levara a cabo mediante el uso de pipelines de github actions que automatizaran el proceso de ejecucion de las buenas practicas definidas para cada nueva pull request.

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

### Análisis de dependencias

-   **Ventaja:**
    - Ayuda a identificar y gestionar los componentes o módulos del proyecto.
-   **Desventaja:**
    - Si las dependencias no se gestionan correctamente, pueden surgir problemas de mantenimiento y escalabilidad.