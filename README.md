# ProyectoLibrosScriptSorcerers

Aplicación web full stack sobre gestión de libros y autores desarrollada con Angular y Spring Boot.

## Tecnologías

- **Frontend:** Angular 21
- **Backend:** Java con Spring Boot
- **Base de datos:** H2 en memoria (no requiere instalación)

## Requisitos previos

Antes de arrancar el proyecto, asegúrate de tener instalado:

- [Node.js 18 o superior](https://nodejs.org/en)
- Angular CLI: abre una terminal y ejecuta `npm install -g @angular/cli`
- [Java 21 o superior](https://www.oracle.com/java/technologies/downloads/)
- [Spring Tools Suite 4 (STS)](https://spring.io/tools) — entorno de desarrollo para proyectos Spring Boot

---

## 1. Arrancar el Backend

1. Abre **Spring Tools Suite (STS)**
2. Ve a **File → Import → Maven → Existing Maven Projects**
3. Haz clic en **Browse** y navega hasta la carpeta `backend` del proyecto (donde está el `pom.xml`) → **Finish**
4. Espera a que STS descargue las dependencias de Maven
5. Clic derecho sobre `DemoApplication.java` → **Run As → Spring Boot App**
6. Cuando veas `Started DemoApplication` en la consola, el backend está listo en `http://localhost:8080`

### Endpoints disponibles

| Método | URL | Descripción |
|--------|-----|-------------|
| GET | /autores | Listar todos los autores |
| GET | /autores/{nombre} | Detalle de un autor |
| POST | /autores | Crear un autor |
| GET | /autores/{nombre}/libros | Libros de un autor |
| GET | /libros | Listar todos los libros |
| POST | /libros | Crear un libro |

---

## 2. Arrancar el Frontend

1. Abre una terminal y navega hasta la carpeta `frontend`:
2. Instala las dependencias (solo la primera vez):
npm install

Este comando descarga todos los paquetes necesarios de Angular y sus dependencias. Cuando termine verás la carpeta `node_modules` creada automáticamente.

3. Arranca la aplicación:
ng serve

4. Abre el navegador en `http://localhost:4200`

> **Importante:** El backend debe estar arrancado antes de abrir el frontend, de lo contrario no se cargarán los datos.

---

## Problemas encontrados durante el desarrollo

- STS incluye un plugin (Enonic XP) que marcaba el `application.properties` como error. Se solucionó creando el archivo como fichero genérico en lugar de Spring Properties File.
- Al importar el proyecto desde Git como "Projects from Git" en lugar de "Existing Maven Projects", STS no lo reconocía como proyecto Java. Se solucionó reimportando con Maven.
- La clase principal `DemoApplication.java` estaba en el paquete `com.example.demo` mientras que las clases del proyecto estaban en `com.libros`. Se solucionó moviendo `DemoApplication.java` al paquete `com.libros`.
- Angular 21 genera los archivos de componentes sin el sufijo `.component` (por ejemplo `autores.ts` en lugar de `autores.component.ts`). Se actualizaron todas las referencias.