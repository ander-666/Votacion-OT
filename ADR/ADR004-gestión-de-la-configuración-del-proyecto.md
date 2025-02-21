# Gestion de la configuracion del proyecto

* Estado: propuesta
* Responsables:
    - Sergio Villain
    - Samuel Gómez
    - Otilio Elcano
    - Ander Alonso
* Fecha: 2025/02/14

Historia técnica: N/A

## Contexto y planteamiento del Problema

Tras haber elgido GitHub como plataforma de control de versiones y GithubProjects como herrmaienta de gestión asociada, es necesario realizar una correcta configuración tanto del dashboard del proyecto como de la estrategia y reglas de branching que deben de seguir los miembros del equipo. Para ello es necesario especificar las normas y estrategias seguidas asi como definir plazos y responsabilidades, todo ello reflejado en la medida de los posible a traves de la configuración de las herramientas de gestión.

## Factores en la decisión

- **Revisión antes de cambios y despliegues:** Antes de integrar o realizar cualquier cambio o despliegue este debe de ser revisado para no romper nada o     
generar fallos que se pudieran haber evitado.
- **Estrategia clara de branching y versionado:** Es necesario definir una estrategia de branching y versionado clara para agilizar el desarrollo y facilitar la organizacion del codigo
- **Asociar repositorio al proyecto para vincular issues:** Se requiere la asociacion del repositorio con el proyecto para poder linkar las issues a diferentes commits hotfixes etc.

## Opciones consideradas

- **Tableros Kanban**
- **Enlaces automáticos**
- **Automatización con GitHub Actions**
- **Git Flow**
- **Protección de ramas**
- **Versión Semántica (SemVer)** 
- **Vincular issues con GitHub Projects** 
- **Asociar PRs con Issues**


## Decisión

- **Tableros Kanban** porque permite visualizar el estado de las tareas en tiempo real y facilita la colaboración en el equipo, asegurando una mejor organización del flujo de trabajo
- **Enlaces automáticos** porque agiliza el seguimiento de cambios al vincular automáticamente issues, PRs y commits, reduciendo errores humanos y mejorando la trazabilidad.
- **Git Flow** porque proporciona una estructura clara de desarrollo, separando ramas de producción, desarrollo y fixes, lo que facilita la colaboración en equipos y mejora la estabilidad del código.
- **Protección de ramas** porque garantiza que el código mergeado a ramas principales pase por revisiones obligatorias, evitando errores en producción y asegurando la calidad de los cambios.
- **Versión semántica (SemVer)** porque facilita la gestión de versiones al indicar claramente si un cambio es mayor, menor o una corrección, ayudando a mantener compatibilidad entre versiones.
- **Vincular issues con GitHub Projects** porque mejora la planificación y priorización de tareas, asegurando que cada issue esté correctamente organizada dentro del flujo de trabajo del proyecto.
- **Asociar PRs con issues** porque automatiza el cierre de issues cuando se mergea un PR relacionado, manteniendo un historial limpio y asegurando que los cambios implementados tengan una justificación clara.

### Consecuencias
-  **Positivas:**
    - La implementación de prácticas como tableros Kanban o vincular issues con GitHub Projects mejora la visibilidad del proyecto, haciendo más fácil el seguimiento del progreso
    - Herramientas como los enlaces automáticos y la protección de ramas fomentan una mejor colaboración entre miembros del equipo, ya que todos pueden ver el estado de los cambios y los comentarios o revisiones.
    - El uso de Git Flow y la protección de ramas ayuda a mantener la estabilidad del código, ya que impide que cambios no revisados o no probados lleguen a las ramas principales.
    - La automatización de tareas como la asociación de PRs con issues y los enlaces automáticos minimiza la intervención manual, reduciendo la posibilidad de errores humanos.
    - La implementación de SemVer facilita la gestión de versiones al proporcionar una estructura clara sobre cómo y cuándo deben actualizarse las versiones
-  **Negativas:**
    - Git Flow o SemVer requieren que los miembros del equipo comprendan y sigan nuevas metodologías, lo cual puede ser desafiante para aquellos que no están familiarizados con estos enfoques.
    - El uso de herramientas como tableros Kanban o la protección de ramas puede generar una sobrecarga de tareas administrativas si no se manejan adecuadamente, especialmente si el equipo no actualiza y mantiene el flujo de trabajo en tiempo real.
    - El uso de herramientas como GitHub Projects o enlaces automáticos crea dependencia de plataformas específicas. Si hay problemas con esas herramientas, el equipo podría verse afectado en términos de productividad.
    - Si no se configuran correctamente las herramientas o las estrategias, podría aparecer una mala gestión del flujo de trabajo, aumentando el riesgo de errores y retrabajo.

## Ventajas y desventajas de las opciones

### Tableros Kanban
Organizar por columnas como Backlog, En Progreso, Revisión, Terminado.

-   **Ventajas:**
    - Permite ver el estado de las tareas en tiempo real.
    - Todo el equipo sabe quién trabaja en qué.
-   **Desventajas:**
    - Sin mantenimiento, las tarjetas pueden acumularse y perderse.
    - Puede volverse difícil de gestionar con muchas tareas.

### Enlaces automáticos
Vincular issues y PRs para seguimiento automático de tareas.

-   **Ventajas:**
    - Vincula automáticamente issues, PRs y commits para mejor seguimiento y ahorrar tiempo.
    - Evita olvidar enlazar manualmente tareas y cambios.
-   **Desventajas:**
    - Enlaces automáticos pueden ser irrelevantes o repetitivos.
    - Si no se usa bien, puede generar confusión en el historial del proyecto.

### Automatización con GitHub Actions
Mover issues entre columnas al avanzar en el flujo de trabajo.
-   **Ventajas:**
    - Reduce tareas manuales moviendo issues automáticamente.
    - Asegura que todos los cambios sigan el mismo flujo.
-   **Desventajas:**
    - Puede ser complejo de implementar correctamente.
    - Las automatizaciones pueden romperse con cambios en GitHub.

### Git Flow
Ramas principales como main, develop, y ramas de features y hotfixes.

-   **Ventajas:**
    - Separa las ramas de main, develop y ramas de features y hotfixes da una estructura clara de desarrollo.
    - Cada cambio tiene un flujo definido.
-   **Desventajas:**
    - Para proyectos pequeños, puede complicar el proceso.
    - Más ramas significan más integraciones y revisiones.

### Protección de ramas
Revisión obligatoria de PRs antes de mergear a main o develop.

-   **Ventajas:**
    - Obliga a revisar código antes de mergearlo.
    - Solo código validado llega a ramas críticas.
-   **Desventajas:**
    - Requiere revisiones antes de cada merge. 
    - Necesita definir bien quién puede aprobar cambios.

### Versión Semántica (SemVer)
Uso de etiquetas para versiones como v1.0.0.

-   **Ventajas:**
    - Permite saber si un cambio es menor, mayor o una corrección.
    - Los desarrolladores pueden identificar qué cambios afectan su código.
-   **Desventajas:**
    - Si no se aplica bien, pueden usarse versiones incorrectas.
    - Se necesita disciplina para actualizar etiquetas correctamente.

### Vincular issues con GitHub Projects
Asociar issues a tareas en el tablero.

-   **Ventajas:**
    - Las tareas quedan reflejadas en el tablero de gestión.
    - Permite priorizar y asignar tareas claramente.
-   **Desventajas:**
    - Si no se actualiza, el tablero puede quedar desactualizado.
    - No siempre es necesario asociar todas las issues.

### Asociar PRs con issues
Usar Fixes #issue-number en PRs para cerrar issues automáticamente.

-   **Ventajas:**
    - Al mergear un PR, cierra issues relacionados automáticamente, lo que automatiza el cierre de issues.
    - Facilita la trazabilidad de cambios y su justificación.
-   **Desventajas:**
    - Si no se prueba bien, puede cerrarse antes de estar realmente solucionado.
    - Un PR puede estar relacionado con varias issues, complicando el seguimiento.
