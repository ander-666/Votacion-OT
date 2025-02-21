# Miembros del equipo y sus roles (técnico)
-   Estado: aceptada
-   Responsables: 
    - Sergio Villain
    - Samuel Gómez
    - Otilio Elcano
    - Ander Alonso
-   Fecha: 14/02/2025

Historia técnica: N/A 

## Contexto y planteamiento del problema

Es necesario definir claramente los roles y responsabilidades de cada miembro del equipo para garantizar una ejecución eficiente y alineada con los objetivos del proyecto. Los roles a asignar son: backend developer, frontend developer, full stack developer y DevOps.

## Factores en la decisión

-   **Claridad:** Cada miembro debe conocer sus responsabilidades específicas.
-   **Complementariedad:** Los roles deben complementarse entre sí para cubrir todas las necesidades del proyecto.
-   **Flexibilidad:** Capacidad de los roles para adaptarse a cambios en las necesidades del proyecto.
-   **Experiencia:** Asignar roles según las fortalezas y habilidades individuales de los miembros.

## Opciones consideradas

-   **Ingeniero de seguridad** 
-   **Arquitecto de software** 
-   **Especialista en QA**
-   **Analista de datos / Machine Learning Engineer**
-   **Desarrollador full stack**
-   **Desarrollador frontend**
-   **Desarrollador backend**
-   **DevOps**

## Decisión

Opción Elegida: **Desarrollado full stack**, ya que el equipo es pequeño (4 personas), es clave contar con un perfil versátil que pueda trabajar tanto en el frontend como en el backend
Opción Elegida: **Desarrollado frontend**, porque en una plataforma de votación, la experiencia de usuario (UX/UI) y la interfaz web son fundamentales para la participación del público
Opción Elegida: **Desarrollado backend**, porque en una arquitectura de microservicios, el backend es fundamental para la gestión de lógica de negocio, APIs y bases de datos
Opción Elegida: **DevOps**, ya que la arquitectura basada en microservicios requiere una infraestructura bien gestionada para automatización, orquestación y despliegue continuo (CI/CD)

### Consecuencias:

-   **Positivas:**
    -   Estructura equilibrada y ágil

        -   La combinación de DevOps, Backend, Frontend y Full Stack permite un flujo de trabajo eficiente sin sobrecargar a ningún miembro.
        -   Se mantiene la capacidad de iteración rápida con entregas constantes.

    -   Optimización de recursos en un equipo pequeño

        -   Evita la sobreespecialización en áreas innecesarias, garantizando que cada miembro tenga tareas críticas.
        -   Se priorizan funciones esenciales para el desarrollo y despliegue del producto.

    -   Desarrollo escalable con microservicios

        -   La asignación de DevOps permite una infraestructura bien gestionada con CI/CD y despliegue automatizado.
        -   La separación entre Backend y Frontend facilita la escalabilidad futura sin refactorizaciones costosas.

    -   Interoperabilidad y flexibilidad

        -   El Full Stack Developer aporta versatilidad, pudiendo cubrir tanto el backend como el frontend según las necesidades del sprint.
        -   Permite adaptarse a cambios y minimizar cuellos de botella en el desarrollo.
    
-   **Negativas:**
    -   Falta de especialización en QA y Seguridad:

        -   No contar con un especialista en QA puede hacer que los errores lleguen más fácilmente a producción.
        -   La seguridad del sistema dependerá del conocimiento de DevOps y Backend, lo que podría generar vulnerabilidades si no se refuerzan buenas prácticas.

    -   Riesgo de carga excesiva en ciertos roles:

        -   Full Stack y Backend pueden verse sobrecargados si la complejidad del sistema crece rápidamente.
        -   DevOps tendrá que manejar tanto la infraestructura como la seguridad, lo que puede ser demandante sin apoyo especializado.

    -   Menos foco en análisis de datos y optimización a largo plazo:

        -   No se cuenta con un Analista de Datos / Machine Learning Engineer, lo que impide una optimización basada en métricas avanzadas.
        -   Si en el futuro se requiere detectar fraude en la votación o analizar patrones de usuario, habría que incorporar este rol o usar servicios externos.

## Ventajas y desventajas de las opciones

### Ingeniero de seguridad
Protege la aplicación contra vulnerabilidades y ataques, asegurando la integridad y privacidad de los datos
-   **Ventajas:**
    -   Protección de datos sensibles (privacidad de los usuarios e información crítica).
    -   Prevención de ataques y vulnerabilidades, para mitigar riesgos (malware).
-   **Desventajas:**
    -   Ralentización del desarrollo
    -   Se centra en la seguridad y no participa en otros aspectos del producto.

### Arquitecto de Software
Diseña la estructura del sistema y define la comunicación entre los diferentes componentes y microservicios.
-   **Ventajas:**
    -   Garantiza que el sistema pueda crecer y mantenerse eficiente con el tiempo
    -   Define cómo se integran y comunican los diferentes componentes, evitando errores en la implementación
-   **Desventajas:**
    -   Su enfoque a largo plazo puede entrar en conflicto con la necesidad de entregas rápidas.
    -   Si el arquitecto no colabora a menudo con los desarrolladores, sus decisiones pueden ser difíciles de implementar.

### Especialista en QA
 Garantiza la calidad del software mediante pruebas manuales y automatizadas, identificando errores antes del despliegue.
 -   **Ventajas:**
    -   Reducción de errores en producción, detectando problemas antes de que el software sea desplegado.
    -   Garantiza que el producto funcione correctamente y sea intuitivo.
-   **Desventajas:**
    -  Tiempo adicional para pruebas ralentizando los lanzamientos si las pruebas no están bien planificadas.
    -  u enfoque en detectar errores puede desviarse del objetivo general d
### Onalista de Ddtos / Machine Learning Engineer
 Analiza datos para extraer insights y desarrolla modelos de inteligencia artificial para mejorar el sistema.
 -   **Ventajas:**
    -   PProporciona insights valiosos que guían el diseño, desarrollo y mejoras del producto.
    -   Modelos de Machine Learning permiten adaptar la experiencia del usuario a sus necesidades individuales.-   **Desventajas:**
    -   PAlta complejidad técnica, ya que requiere conocimientos avanzados y herramientas específicas.
    -   Dependencia de datos de calidad.
### Oesarrollado full stack*Desarrolla tanto el frontend (interfaz de usuario) como el backend (lógica y bases de datos) de una aplicación.
-   **Ventajas:**
    -   Puede trabajar en frontend y backend sin depender de otros.
    -   Reduce costos y mejora la distribución del trabajo en equipos pequeños.
-   **Desventajas:**
    -   Puede asumir demasiadas tareas y afectar la calidad o tiempos de entrega.
    -   No alcanza el mismo nivel técnico que un especialista en cada área.

### Oesarrollado frontend*Se enfoca en la interfaz de usuario, asegurando una experiencia visual y de interacción óptima en la aplicación.
-   **Ventajas:**
    -   Promueve la colaboración y el aprendizaje cruzado.
    -   Se enfoca en interfaces intuitivas y atractivas.
-   **Desventajas:**
    -   Necesita coordinación con backend para integraciones.
    -   No puede resolver problemas fuera del frontend, limitando su alcance.

### Oesarrollador backend*Se encarga de la lógica del negocio, bases de datos y servidores, gestionando el procesamiento de datos y la seguridad.
-   **Ventajas:**
    -   Optimiza rendimiento, seguridad y escalabilidad del backend.
    -   Maneja bases de datos y lógica del negocio con precisión.
-   **Desventajas:**
    -   Requiere colaboración para asegurar una integración fluida.
    -   No prioriza la interfaz ni la experiencia del usuario final.

### OevOps*Optimiza la infraestructura, automatiza despliegues y supervisa el rendimiento del software para garantizar estabilidad y escalabilidad.
-   **Ventajas:**
    -   Mejora despliegues, integración y entrega continua.
    -   Optimiza infraestructura y monitoreo del sistema.
-   **Desventajas:**
    -   Requiere dominar múltiples herramientas y procesos.
    -   No participa directamente en la lógica del producto o UX.