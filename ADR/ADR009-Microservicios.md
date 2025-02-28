# [Microservicios que componen el sistema]
-   Estado: aceptada
-   Responsables: 
    - Sergio Villain
    - Samuel Gómez
    - Otilio Elcano
    - Ander Alonso
-   Fecha: 28/02/2025

Historia técnica: N/A 

## Contexto y Planteamiento del Problema

En una aplicacion de votacion basada en microservicios es necesario definir que funcionaliades van a ser implementadas como servicio independiente y que funcionalidades van a ser agrupadas en un mismo servicio.

## Factores en la Decisión

* Seguridad de los datos y cumplimiento con la tiada CID
* Escalabilidad de la aplicacion de votacion
* Separacion de responsabilidades 

## Opciones Consideradas

**API, proveedor de identidades, frontend y base de datos**

## Decisión

 Opción elegida:
    - API: Porque permite desacoplar la lógica de negocio del frontend y otros servicios.
    - Proveedor de identidades: Porque mejora la seguridad del sistema.
    - Frontend: Porque el proyecto necesita una interfaz accesible para los usuarios.
    - Base de datos: Porque sirve para almacenar y gestionar los datosde manera etructurada.

### Consecuencias

-  **Positivas:**
    - Mayor seguridad al delegar la autenticación en un proveedor de identidades especializado.
    - Escalabilidad y modularidad, permitiendo el crecimiento independiente de cada componente.
    - Desarrollo ágil, facilitando el trabajo en paralelo entre frontend, backend y base de datos.
-  **Negativas:**
    - Mayor complejidad en la integración y comunicación entre API, frontend y base de datos.
    - Dependencia de terceros, lo que puede generar costos inesperados o problemas de disponibilidad.
    - Posible latencia, ya que cada solicitud pasa por múltiples servicios antes de responder.

## Ventajas y Desventajas de las opciones

### Frontend
Es la interfaz gráfica con la que los usuarios interactúan, consumiendo datos desde la API y presentándolos de forma amigable.

-   **Ventaja:**
    - Permite a los usuarios interactuar con el sistema de forma intuitiva y atractiva.
-   **Desventaja:**
    - Puede verse afectado por cambios en los microservicios backend, requiriendo frecuentes actualizaciones.

### API
Actúa como un intermediario entre el frontend y otros microservicios, permitiendo el intercambio de datos y funcionalidades mediante endpoints.

-   **Ventaja:**
    - Permite la comunicación entre diferentes servicios de manera modular y escalable.
-   **Desventaja:**
    - Si no se gestiona bien, puede generar latencia.

### Proveedor de identidad
Gestiona la autenticación y autorización de usuarios, asegurando que solo las personas y sistemas autorizados accedan a los recursos.

-   **Ventaja:**
    - Centraliza la autenticación y autorización, mejorando la seguridad y facilitando la gestión de accesos.
-   **Desventaja:**
    - Si falla, puede bloquear el acceso a todos los servicios que dependen de él.

### Base de datos
Almacena, organiza y gestiona la información del sistema, proporcionando acceso eficiente y seguro a los datos cuando se necesiten.

-   **Ventaja:**
    - Centraliza y gestiona los datos de manera estructurada y confiable.
-   **Desventaja:**
    - Puede convertirse en un punto único de fallo o en un cuello de botella si no se optimiza adecuadamente.
