




# Se deja en el README consigna original 


## Examen Parcial (TP FINAL): Desarrollo de APIs y Sistemas de Gestión Forense
Materia: Programación sobre Redes (Backend)

Institución: IFTS 16

Tiempo Límite: 120 minutos (sin tiempo)


### Introducción al Escenario
El Ministerio de Seguridad requiere un prototipo para la Gestión de Peritos Informáticos. El sistema debe ser capaz de administrar el personal (Alta/Baja) y auditar cada intento de acceso no autorizado. Se evaluará la robustez del código, el manejo de errores y la prolijidad en la consola de administración.

### Requerimientos Técnicos (Obligatorios)
1. Base de Datos (Relacional - SQLite)
Deberán configurar la base de datos con las siguientes especificaciones:

    Tabla roles: (ID, nombre_rol). Roles requeridos: ADMIN, FORENSIC_INSPECTOR, AUDITOR.

    Tabla users:

        username (Único).

        role_id (Clave foránea hacia la tabla roles).

        active (Booleano para Soft Delete, default true).

        created_at (Timestamp automático).


2. Desarrollo del Backend (Express.js)
Deberán implementar los siguientes endpoints cumpliendo las reglas de negocio:

POST /api/v1/peritos: Registra un nuevo perito.

    Validación: El nombre de usuario no debe estar vacío.

    Validación de Rol: El ID del rol debe existir en la tabla roles.

    Manejo de Errores: Si el username ya existe, devolver 409 Conflict.


DELETE /api/v1/peritos/:id: Realiza una baja lógica.

    Debe verificar si el usuario existe antes de intentar "borrarlo".

    Si no existe, devolver 404 Not Found.


GET /api/v1/peritos: Lista todos los peritos activos.

    Debe permitir filtrar por rol mediante Query Params (ej. ?role=ADMIN).

    La respuesta debe incluir el nombre del rol mediante un LEFT JOIN.


GET /api/v1/peritos/:id

    Debe incluir el nombre del rol asociado mediante un JOIN (o inclusión en el ORM).

    Debe validar si el usuario existe y si se encuentra activo (active = true). En caso de no existir o estar dado de baja lógicamente, debe responder con un código 404 Not Found.


Base de datos:
Configurar la capa de persistencia utilizando Sequelize ORM en lugar de consultas SQL manuales. El proyecto debe contar con un módulo de conexión dinámico que permita alternar mediante variables de entorno (.env) entre SQLite para desarrollo local y un contenedor de PostgreSQL para producción, manteniendo la misma estructura de modelos y controladores.


3. Interfaz de Consola y Auditoría (Chalk + Morgan)
El sistema debe ser "parlanchín" por consola para facilitar el monitoreo:

Uso de Morgan para loguear peticiones HTTP.

Chalk Personalizado:

    Al crear un usuario: Mensaje en cyan con los datos del nuevo registro.

    Al ocurrir un error de validación: Mensaje en yellow detallando el campo fallido.

    Al detectar un error crítico (500): Mensaje en red con el stack de error.


Criterios de Evaluación

Punto      Criterio                                                                                             Peso
1       Integridad Referencial: Correcta implementación de Foreign Keys en SQLite.                              20%
2       Validación y Errores: Uso de http-errors y manejo de excepciones en bloques try/catch.                  30%
3       Lógica de Soft Delete: Asegurar que los datos nunca se borran físicamente del archivo .db.              20%
4       Routing y Estructura: Uso correcto de parámetros (Params vs Query) y métodos HTTP (POST/GET/DELETE).    20%
5       UX en Consola: Uso efectivo de Chalk para diferenciar tipos de eventos.                                 10%



Entrega
    Repositorio de GitHub con el código fuente.

    Archivo forensics.db con al menos 3 usuarios de prueba precargados.

    Documentación breve (README) de cómo ejecutar el proyecto.