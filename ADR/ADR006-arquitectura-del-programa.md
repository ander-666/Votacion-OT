# Arquitectura elegida para el sistema

* Estado: aceptada
* Responsables:
    - Sergio Villain
    - Samuel Gómez
    - Otilio Elcano
    - Ander Alonso
* Fecha: 2025/02/14

Historia técnica: NA

## Contexto y Planteamiento del Problema

El equipo debe decidir la estrategia de despliegue para una aplicación web de votación basada en microservicios. La aplicación debe ser capaz de escalar, ser robusta ante fallos y permitir despliegues continuos con baja fricción. El despliegue debe ser en la nube, considerando las necesidades de alta disponibilidad y gestión de microservicios.

## Factores en la Decisión

* Escalabilidad para manejar picos de tráfico
* Alta disponibilidad y resiliencia para garantizar que la aplicación no se caiga
* Seguridad y protección de los datos de los usuarios
* Despliegue eficiente y CI/CD para actualizaciones continuas sin interrupciones


## Opciones Consideradas

- **Arquitectura distribuida**
- **Arquitectura monolitica**
- **Arquitectura de microservicios**
- **Arquitectura basada en eventos**


## Decisión

Opción elegida: **Arquitectura distribuida** porque mejora la escalabilidad y disponibilidad del sistema al distribuir la carga de trabajo entre múltiples nodos, reduciendo puntos únicos de falla y optimizando el rendimiento en entornos de alto tráfico. Ademas permite partir de un sistema pequeño que posteriormente puede escalar hacia una arquitectura de microservicios.

### Consecuencias

-  **Positivas:**
    - Al distribuir la carga de trabajo entre múltiples nodos, la arquitectura distribuida permite escalar de manera eficiente según la demanda.
    - Dado que la carga está distribuida entre varios nodos, el fallo de uno no afecta a todo el sistema, lo que aumenta la disponibilidad.
    - Al permitir que diferentes componentes del sistema operen en paralelo, se optimiza el rendimiento.
-  **Negativas:**
    - La arquitectura distribuida introduce una mayor complejidad en la gestión, ya que requiere monitorizar, administrar y coordinar múltiples servicios.
    - Es difícil mantener la consistencia de los datos entre nodos, lo que puede generar problemas si no se implementan correctamente estrategias.


## Ventajas y Desventajas de las opciones

### Arquitectura distribuida
Sistema compuesto por múltiples nodos interconectados que colaboran para procesar datos y servicios, mejorando escalabilidad y disponibilidad.

-   **Ventajas:**
    - Permite distribuir la carga entre varios nodos.
    - Reduce puntos únicos de falla.
-   **Desventajas:**
    - Requiere coordinación entre nodos.
    - Puede haber retrasos en la sincronización de datos.

### Arquitectura monolitica
Modelo en el que toda la aplicación se desarrolla como un solo bloque de código, donde todos los componentes están integrados en un único sistema.

-   **Ventajas:**
    - Desarrollo, despliegue y mantenimiento más fáciles.
    - Menos latencia en llamadas internas.
-   **Desventajas:**
    - Requiere más recursos para crecer.
    - Cambios pueden afectar toda la aplicación.

### Arquitectura de microservicios
Enfoque modular donde la aplicación se divide en pequeños servicios independientes que se comunican entre sí, facilitando escalabilidad y mantenimiento.

-   **Ventajas:**
    - Cada servicio escala según su necesidad.
    - Servicios pequeños y desacoplados lo que facilita su mantenimiento
-   **Desventajas:**
    - Necesita gestión de comunicación entre servicios.
    - Requiere herramientas adicionales para monitoreo y despliegue.

### Arquitectura basada en eventos
Sistema en el que los componentes reaccionan a eventos generados por otros servicios, permitiendo una comunicación asincrónica y flexible.

-   **Ventajas:**
    - Procesa eventos en tiempo real sin bloqueos.
    - Puede manejar grandes volúmenes de datos y eventos en paralelo.
    - Los servicios no dependen directamente entre sí.
-   **Desventajas:**
    - Seguimiento de eventos puede ser complejo.
    - Si no se maneja bien, eventos pueden perderse o duplicarse.