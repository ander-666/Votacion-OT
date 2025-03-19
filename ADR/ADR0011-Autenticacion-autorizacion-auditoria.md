# Autenticacion, autorizacion, auditoria

-   Estado: aceptada
-   Responsables: 
    - Sergio Villain
    - Samuel Gómez
    - Otilio Elcano
    - Ander Alonso
-   Fecha: 14/03/2025

Historia técnica: N/A

## Contexto y Planteamiento del Problema

El desarrollo de aplicaciones web seguras requiere la implementación de mecanismos de autenticación, autorización y auditoría para garantizar el control de acceso y la trazabilidad de acciones de los usuarios.

## Factores en la Decisión

* Seguridad: La opción elegida debe minimizar riesgos de exposición, garantizar integridad y evitar accesos no autorizados.
* Escalabilidad: Debe permitir un manejo eficiente de múltiples usuarios y servicios sin afectar el rendimiento del sistema.
* Facilidad de implementación: Debe ser compatible con la arquitectura actual (frontend, backend, API Gateway, BBDD y contenedores Docker).
* Control de acceso y autorización: Debe permitir definir permisos granulares y gestionar accesos de usuarios y servicios.

## Opciones Consideradas

**Api key, JWT, OAuth 2.0 + OpenID Connect, SAML, mTLS**

## Decisión

 Opciones elegidas:
    - API Key, porque es una opción sencilla y eficaz para autenticar servicios y controlar el acceso a la API, asegurando que solo clientes autorizados puedan consumirla.
    - JWT, porque permite autenticación sin estado, escalabilidad y transmisión segura de información sobre el usuario, siendo ideal para arquitecturas distribuidas y microservicios.

### Consecuencias

-  **Positivas:**
    - Mayor seguridad y escalabilidad: La combinación de API Key y JWT permite un control de acceso seguro y eficiente en arquitecturas distribuidas.
    - Autenticación sin estado: JWT reduce la carga en el backend al no requerir sesiones en memoria, mejorando el rendimiento.
    - Flexibilidad en la autorización: Permite implementar control granular de accesos con scopes y roles según el usuario.
    - Facilidad de integración: API Keys y JWT son compatibles con la mayoría de API Gateways y frameworks modernos.
-  **Negativas:**
    - Riesgo de exposición de API Keys: Si no se gestionan correctamente, pueden ser comprometidas y reutilizadas en ataques.
    - JWT sin revocación inmediata: Una vez emitido, un JWT válido no puede invalidarse hasta que expire, lo que puede ser un riesgo si una cuenta se ve comprometida.
    - Carga en el frontend: La validación y almacenamiento seguro de tokens en el cliente requiere una gestión adecuada para evitar vulnerabilidades como XSS o robo de tokens.

## Ventajas y Desventajas de las opciones

### API Key
Una API Key es una clave única generada por el servidor que permite autenticar y autorizar solicitudes a una API. Se envía en cada petición como un encabezado o parámetro de URL y se usa comúnmente para servicios automatizados y acceso programático a recursos protegidos.

-   **Ventajas:**
    - Fácil de implementar, porque su uso es simple y compatible con la mayoría de API Gateways y frameworks.
    - Eficiente en autenticación de servicios, porque permite un control rápido de acceso sin necesidad de estados complejos.
    - Útil para accesos programáticos, porque facilita la integración entre sistemas automatizados sin procesos de autenticación interactivos.

-   **Desventajas:**
    - Menos segura si no se protege adecuadamente, porque una API Key expuesta puede ser reutilizada por atacantes.
    - No contiene información del usuario, porque solo identifica a la aplicación o cliente, no a un usuario autenticado.
    - Gestión manual compleja, porque requiere rotación periódica de claves para minimizar riesgos de compromiso.

### JWT
JWT es un estándar de autenticación basado en tokens que permite la transmisión segura de información entre partes. Está compuesto por un encabezado, un payload con claims (datos del usuario) y una firma digital que garantiza su integridad. Se usa ampliamente en arquitecturas sin estado y en sistemas con autorización granular.

-   **Ventajas:**
    - Autenticación sin estado, porque el backend no necesita mantener sesiones, lo que mejora escalabilidad y rendimiento.
    - Incluye información del usuario, porque contiene claims con datos útiles para autorización y control de accesos.
    - Seguro si se implementa correctamente, porque usa firmas digitales para evitar manipulaciones.

-   **Desventajas:**
    - No se puede invalidar fácilmente, porque una vez emitido, es válido hasta que expire, lo que puede ser un problema en caso de cuentas comprometidas.
    - Mayor tamaño en cada solicitud, porque los tokens incluyen información codificada, lo que puede aumentar el ancho de banda.
    - Almacenamiento seguro requerido, porque si un token se almacena en localStorage sin medidas de seguridad, es vulnerable a ataques XSS.

### OAuth 2.0 + OpenID Connect
OAuth 2.0 es un marco de autorización que permite a los usuarios otorgar acceso limitado a sus datos sin compartir credenciales, utilizando tokens de acceso. OpenID Connect (OIDC) extiende OAuth 2.0 para incluir autenticación de usuarios, proporcionando un token de identidad (ID Token) con información verificable sobre el usuario. Es ampliamente utilizado en aplicaciones modernas, APIs y autenticación federada.

-   **Ventajas:**
    - Autenticación y autorización unificadas, porque permite tanto la verificación de identidad como el control de acceso a recursos protegidos.
    - Compatible con SSO y federación de identidad, porque permite a los usuarios autenticarse una sola vez y acceder a múltiples servicios.
    - Seguro y escalable para aplicaciones modernas, porque los tokens pueden contener información granular sobre permisos y roles sin necesidad de almacenar sesiones.
    - Amplio soporte en la industria, porque es utilizado por grandes plataformas como Google, Microsoft y AWS para autenticación de terceros.

-   **Desventajas:**
    - Mayor complejidad de implementación, porque requiere configurar un servidor de autorización y gestionar flujos de autenticación seguros.
    - Dependencia de un proveedor de identidad, lo que puede ser un punto único de fallo si el servicio de autenticación no está disponible.
    - Expiración y revocación de tokens requiere gestión adicional, porque los tokens de acceso deben renovarse periódicamente o invalidarse cuando un usuario pierde acceso.
    - Exposición a ataques si no se implementa correctamente, porque los tokens deben protegerse contra robo (por ejemplo, en almacenamiento inseguro en frontend).

### SAML
SAML es un estándar de autenticación basado en XML que permite la autenticación federada entre sistemas. Se utiliza principalmente en entornos empresariales para habilitar el inicio de sesión único (SSO) entre múltiples aplicaciones y servicios, permitiendo que un proveedor de identidad (IdP) autentique a los usuarios y emita aserciones de seguridad para los proveedores de servicios (SP).

-   **Ventajas:**
    - Autenticación federada y SSO, porque permite a los usuarios acceder a múltiples aplicaciones con una única autenticación.
    - Mejora la seguridad, porque reduce la necesidad de gestionar múltiples credenciales y minimiza el riesgo de ataques de phishing.
    - Amplio soporte empresarial, porque es compatible con muchas aplicaciones corporativas, incluyendo Microsoft, Google y AWS.
    - Evita almacenamiento de contraseñas en cada servicio, porque la autenticación se delega a un proveedor de identidad (IdP) centralizado.

-   **Desventajas:**
    - Mayor complejidad de implementación, porque requiere configuración entre el proveedor de identidad (IdP) y los proveedores de servicio (SP).
    - Basado en XML, lo que implica mayor peso en las comunicaciones y procesamiento en comparación con JWT y OAuth 2.0.
    - Menos adecuado para APIs y microservicios, porque su diseño está orientado a aplicaciones web empresariales y no a autenticación ligera.
    - Dependencia del IdP, lo que significa que si el proveedor de identidad falla, todos los servicios autenticados con SAML se ven afectados.

### mTLS
mTLS (Mutual Transport Layer Security) es un mecanismo de autenticación mutua en el que tanto el cliente como el servidor deben presentar certificados digitales válidos para establecer una conexión segura. Se utiliza en arquitecturas de microservicios, API seguras y comunicaciones entre servidores para garantizar la identidad de ambas partes y evitar ataques de intermediarios (MITM).

-   **Ventajas:**
    - Autenticación bidireccional segura, porque garantiza que tanto el cliente como el servidor son entidades de confianza.
    - Previene ataques de intermediario (MITM), porque la comunicación está cifrada y autenticada en ambos extremos.
    - No depende de contraseñas o tokens, porque usa certificados digitales que eliminan la necesidad de compartir credenciales sensibles.
    - Ideal para entornos de microservicios y API críticas, porque asegura comunicaciones seguras sin depender de terceros proveedores de autenticación.
-   **Desventajas:**
    - Mayor complejidad de configuración y mantenimiento, porque requiere gestionar certificados, su emisión, expiración y renovación periódica.
    - Coste computacional más alto, porque la verificación de certificados en cada conexión añade una sobrecarga en comparación con tokens ligeros como JWT.
    - Menos flexible para autenticación de usuarios finales, porque está diseñado principalmente para la autenticación entre servicios y no para usuarios individuales.
    - Dependencia de una PKI (Public Key Infrastructure), porque necesita una infraestructura de claves públicas bien gestionada para emitir y revocar certificados.
