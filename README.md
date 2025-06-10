# Sistema de Gestión de Eventos

Este es un proyecto de aplicación web completa para la gestión y organización de eventos. Permite a los usuarios registrarse, crear sus propios eventos, e inscribirse en eventos creados por otros.

La aplicación está construida con un backend de API REST usando .NET y un frontend de tipo Single Page Application (SPA) con Angular.

## Tecnologías Utilizadas

### Backend
* **.NET 9** - Framework para la construcción de la API.
* **ASP.NET Core Web API** - Plantilla para crear los servicios RESTful.
* **Entity Framework Core (EF Core)** - para la interacción con la base de datos.
* **SQL Server** - Sistema de gestión de base de datos.
* **xUnit** - Framework para las pruebas unitarias del backend.

### Frontend
* **Angular 17+** - Framework para la construcción de la interfaz de usuario.
* **TypeScript** - Superset de JavaScript que añade tipado estático.
* **Angular CLI** - Herramienta de línea de comandos para gestionar el proyecto de Angular.
* **Jasmine y Karma** - Frameworks para las pruebas unitarias del frontend.

## Características Principales

* **Gestión de Usuarios:**
    * Registro de nuevos usuarios.
    * Inicio de sesión .
    * Cierre de sesión.
* **Gestión de Eventos:**
    * Visualización pública de la lista de eventos activos.
    * Creación de nuevos eventos por parte de usuarios registrados.
    * Edición de eventos creados por el propio usuario.
    * Eliminación de eventos creados por el propio usuario.
* **Interacción con Eventos:**
    * Inscripción de un usuario logueado a cualquier evento.
    * Cancelación de la inscripción a un evento.
    * Página de "Mis Eventos Creados" para que un usuario vea y gestione sus eventos.
    * Página de "Mis Inscripciones" para que un usuario vea los eventos a los que se ha registrado.
