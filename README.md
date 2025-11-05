# To Do List App

Aplicación full-stack de gestión de tareas construida con NestJS (backend) y Angular (frontend).
Permite crear, listar, actualizar y eliminar tareas mediante una API REST que se comunica con un frontend.

## Estructura del Proyecto

Este repositorio contiene dos proyectos:

- **todo-backend**: API REST desarrollada con NestJS y TypeORM
- **todo-frontend**: Aplicación web desarrollada con Angular

## Requisitos Previos

- Node.js (v18 o superior)
- npm o yarn
- PostgreSQL (para el backend)
- (Opcional) pgAdmin 4 para administrar la base de datos gráficamente

## Instalación

### Backend
Ve al directorio del backend e instala las dependencias: 
```bash
cd todo-backend
npm install
```
Crea un archivo .env en la raíz del backend con la siguiente configuración:
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_contraseña
DB_DATABASE=todo_db
PORT=3000
```
Crea la base de datos en PostgreSQL: 
```
CREATE DATABASE todo_db;
```

### Frontend 
Ve al directorio del frontend e instala las dependencias: 
```bash
cd todo-frontend
npm install
```

## Ejecución 

### Backend 
Inicia el servidor: 
```bash
cd todo-backend
npm run start:dev
```
El servidor estará disponible en http://localhost:3000

### Frontend 
Inicia la aplicación: 
```bash
cd todo-frontend
ng serve -o
```
La aplicación estará disponible en http://localhost:4200



## API Endpoints 

| Método | Endpoint     | Descripción                    |
| ------ | ------------ | ------------------------------ |
| GET    | `/tasks`     | Obtener todas las tareas       |
| GET    | `/tasks/:id` | Obtener una tarea por ID       |
| POST   | `/tasks`     | Crear una nueva tarea          |
| PUT    | `/tasks/:id` | Actualizar una tarea existente |
| DELETE | `/tasks/:id` | Eliminar una tarea             |

## Flujo de la aplicación 
1. El frontend en Angular muestra la lista de tareas obtenidas desde la API.
2. El usuario puede crear, editar, marcar como completadas o eliminar tareas.
3. El backend en NestJS recibe las peticiones y las procesa mediante TypeORM.
4. Los datos se almacenan en PostgreSQL.
5. Angular actualiza la interfaz según las respuestas del servidor. 

## Tecnologías Utilizadas
### Backend 
- NestJS
- TypeORM
- PostgreSQL
- TypeScript

### Frontend
- Angular
- TypeScript

## Autor 
**Laura María Del Cielo Ortiz Ponce**
lauraponce701@gmail.com

