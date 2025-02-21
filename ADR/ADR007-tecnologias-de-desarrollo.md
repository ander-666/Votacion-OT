# Tecnologías de desarrollo

* Estado: propuesta
* Responsables:
    - Sergio Villain
    - Samuel Gómez
    - Otilio Elcano
    - Ander Alonso
* Fecha: 2025/02/15

Historia técnica: N/A

## Contexto y Planteamiento del Problema

Para llevar a cabo el desarrollo del proyecto es necesario decidir cuales seran las tecnologias frameworks y lenguajes a utilizar a lo largo cel ciclo de vida del proyecto. Es importante que todos los desarrolladores sean conscientes de las tecnologias a implementar en cada apartado con el fin de que sean compatibles entre si y comodas para todos.

## Factores en la Decisión

* Que la curva de aprendizaje no se demasiado grande 
* Que tengan implementaciones y herramientas compatibles con desarrollo web
* Que en la medida de lo posible opensource
* Que sean compatibles / faciles de implementar en la arquitectura seleccionada

## Opciones Consideradas

* **.NET Core**
* **Java**
* **C#**
* **React**
* **Angular**
* **MySQL**
* **Postgres**
* **SQL Server**
* **Spring Boot**
* **Visual Studio Code**
* **Visual Studio**
* **NetBeans**

## Decisión

 Opciónes elgidas:
    - Backend: Java (Provisional) + Spring Boot, porque 
    - Frontend: React, porque algunos de los miembros del equipo de desarrollo ya tienen experiencia con el framework.
    - BD: Postgres SQL, porque al ser una aplicacion de votacion con gran volumen de datos un mayor rendimiento y el uso de transacciones son especialmente utiles.
    - IDE : Visual Studio Code, porque es un IDE que se puede utilizar para muchas tecnologías utlizando sus extensiones.
    
### Consecuencias

-  **Positivas:**
    - Java + Spring Boot: Alto rendimiento y escalabilidad gracias a Spring Boot, facilitando la creación de microservicios y API REST eficientes.
    - React: Componentes reutilizables y Virtual DOM optimizado, lo que mejora la experiencia de usuario y el rendimiento en interfaces dinámicas.
    - PostgreSQL: Mejor manejo de transacciones y consultas complejas gracias a su cumplimiento estricto de ACID y su soporte avanzado para JSON, índices y concurrencia, lo que mejora el rendimiento en aplicaciones con grandes volúmenes de datos
    - Visual Studio Code: Ofrece flexibilidad, rapidez y extensibilidad gracias a sus múltiples extensiones, integración con Git y su carácter multiplataforma y gratuito.
-  **Negativas:**
    - Java + Spring Boot: Mayor consumo de memoria y tiempos de arranque más largos en comparación con otras tecnologías más livianas.
    - React: Complejidad en la gestión del estado (Redux o Context API) en aplicaciones grandes.
    - PostgreSQL: Su configuración inicial puede ser compleja, y el rendimiento puede degradarse en casos de consultas muy pesadas sin optimización adecuada.
    - Visual Studio Code: Puede presentar limitaciones para proyectos grandes, ya que depende de extensiones para características avanzadas, lo que puede aumentar la complejidad y el consumo de recursos.

## Ventajas y Desventajas de las opciones

### .NET Core

Es un framework de desarrollo de código abierto y multiplataforma creado por Microsoft, ideal para construir aplicaciones web, microservicios y backend escalables.

-   **Ventajas:**
    - Es multiplataforma (Windows, Linux, MacOS)
    - Alto rendimiento y escalabilidad.
    - Es de código abierto con una comunidad activa.
-   **Desventajas:**
    - Menos compatibilidad con bibliotecas antiguas de .NET Framework.
    - Curva de aprendizaje para desarrolladores no familiarizados con .NET.

### Java

Lenguaje de programación orientado a objetos ampliamente usado en aplicaciones empresariales, desarrollo móvil (Android) y sistemas distribuidos, gracias a su portabilidad a través de la JVM.

-   **Ventajas:**
    - Es multiplataforma gracias a la JVM.
    - Tiene una Gran cantidad de bibliotecas y frameworks.
    - Es un lenguaje maduro con gran soporte empresarial.
-   **Desventajas:**
    - Uso de memoria relativamente alto.
    - Verbosidad en la sintaxis comparado con otros lenguajes modernos.

### C#

Lenguaje de programación desarrollado por Microsoft, versátil y orientado a objetos, utilizado principalmente en aplicaciones .NET, videojuegos con Unity y desarrollo empresarial.

-   **Ventajas:**
    - Es un lenguaje moderno, seguro y orientado a objetos.
    - Integración con .NET y ecosistema Microsoft.
    - Tiene una buena gestión de memoria con el recolector de basura.
-   **Desventajas:**
    - Dependence del ecosistema Microsoft.
    - Puede ser menos eficiente en entornos no Windows.

### React

Librería de JavaScript desarrollada por Meta para construir interfaces de usuario interactivas y reutilizables en aplicaciones web, basada en el concepto de componentes y Virtual DOM.

-   **Ventajas:**
    - Virtual DOM para mejor rendimiento.
    - Reutilización de componentes.
    - Gran comunidad y soporte.
-   **Desventajas:**
    - Alta frecuencia de cambios y actualizaciones.
    - Puede ser complejo manejar el estado en aplicaciones grandes.

### Angular

Framework de desarrollo frontend basado en TypeScript, diseñado para crear aplicaciones web escalables con una arquitectura modular y herramientas avanzadas.

-   **Ventajas:**
    -   Soporte de TypeScript, lo que mejora la mantenibilidad del código
    -   Herramientas como Angular CLI facilitan el desarrollo
    -   Gran ecosistema y soporte de la comunidad
-   **Desventajas:**
    -   Curva de aprendizaje grande
    -   Mayor consumo de recursos en comparación con otras opciones más ligeras
    -   Las actualizaciones pueden requerir refactorización significativa

### MySQL

Sistema de gestión de bases de datos relacional (RDBMS) de código abierto, conocido por su velocidad, facilidad de uso y amplia adopción en aplicaciones web.

-   **Ventajas:**
    -   Alto rendimiento en consultas de lectura
    -   Fácil de configurar y administrar
    -   Compatible con múltiples motores de almacenamiento
-   **Desventajas:**
    -   Menos eficiente en operaciones de escritura masiva
    -   Falta de soporte nativo para funciones avanzadas de JSON y concurrencia en comparación con Postgres
    -   Escalabilidad horizontal limitada sin herramientas adicionales

### Postgres

Sistema de gestión de bases de datos relacional (RDBMS) de código abierto, conocido por su robustez, extensibilidad y soporte avanzado para transacciones y modelos de datos complejos.

-   **Ventajas:**
    -   Soporte avanzado para JSON, consultas complejas y concurrencia
    -   Sistema de transacciones ACID robusto
    -   Mejor manejo de escritura y consultas en grandes volúmenes de datos en comparación con MySQL
-   **Desventajas:**
    -   Mayor consumo de recursos en comparación con MySQL
    -   Configuración y optimización más complejas
    -   Puede ser más lento en consultas simples de solo lectura

### SQL Server

Sistema de gestión de bases de datos relacional desarrollado por Microsoft, optimizado para entornos empresariales con herramientas avanzadas de administración y seguridad.

-   **Ventajas:**
    -   Integración nativa con el ecosistema de Microsoft
    -   Seguridad avanzada con cifrado y autenticación integrada
    -   Buen rendimiento en entornos empresariales con grandes volúmenes de datos
-   **Desventajas:**
    -   Costos de licencia elevados en comparación con opciones open-source
    -   Funciona mejor en entornos Windows, con soporte limitado en Linux
    -   Mayor consumo de recursos en comparación con otras bases de datos relacionales

### Spring Boot

Framework para Java que simplifica el desarrollo de aplicaciones empresariales al proporcionar configuraciones automáticas
-   **Ventajas:**
    - Simplifica la configuración y puesta en marcha de aplicaciones.
    - Incluye servidores embebidos, eliminando la necesidad de configuraciones externas complejas.
-   **Desventajas:**
    -  Pesado en términos de consumo de memoria y recursos, especialmente para aplicaciones pequeñas.
    - La automatización de configuraciones puede limitar la flexibilidad.
    

### Visual Studio Code

Editor de texto ligero y extensible desarrollado por Microsoft, utilizado ampliamente para desarrollo en múltiples lenguajes y plataformas

-   **Ventajas:**
    - Ligero y rápido, ideal para proyectos pequeños o de mediana escala.
    - Altamente extensible mediante una gran cantidad de extensiones disponibles en su marketplace.
    - Soporte para múltiples lenguajes de programación y herramientas de desarrollo.
    - Integración con Git y gratuito. 
-   **Desventajas:**
    - Puede volverse pesado si se instalan demasiadas extensiones.
    - No está optimizado para proyectos de gran escala en comparación con entornos de desarrollo integrados (IDEs) como Visual Studio.
    - Sin extensiones, puede ser limitado en funcionalidad.

### Visual Studio
IDE completo desarrollado por Microsoft, ampliamente utilizado para el desarrollo de aplicaciones .NET y otros lenguajes como C++, Python o JavaScript

-   **Ventajas:**
    - Herramienta integral con soporte avanzado para depuración, análisis de código y pruebas.
    - Optimizado para el desarrollo en .NET y C#, con características como IntelliSense y diseño de interfaces gráficas.
-   **Desventajas:**
    - Pesado y consume una gran cantidad de recursos, lo que puede ralentizar sistemas menos potentes.
    - Puede ser costoso, especialmente en su versión Enterprise, para equipos pequeños como el nuestro.
    - La interfaz puede resultar abrumadora para principiantes.

### NetBeans
IDE gratuito y de código abierto para el desarrollo de aplicaciones Java y otros lenguajes como PHP, C++ y HTML.

-   **Ventajas:**
    - Buen soporte para el desarrollo en Java, con herramientas integradas para la creación de interfaces gráficas y proyectos empresariales.
    - Multiplataforma y gratuito, ideal para estudiantes y desarrolladores que buscan una solución accesible.
    - Configuración sencilla para proyectos pequeños y medianos.
-   **Desventajas:**
    - Interfaz menos moderna y fluida en comparación con IDEs más recientes como IntelliJ IDEA o Visual Studio.
    - Puede ser más lento en sistemas con pocos recursos.
    - Menos extensible y con una comunidad más limitada que otras opciones como VS Code