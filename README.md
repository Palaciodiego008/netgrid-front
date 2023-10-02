# NetGrid Frontend (Vue.js 3 & Tailwind CSS)

## Descripción

Este es el repositorio del frontend de NetGrid, una aplicación de gestión de proyectos desarrollada con Vue.js 3, Tailwind CSS y Axios. NetGrid te permite administrar proyectos y tareas de manera eficiente.

## Requisitos del Sistema

Asegúrate de contar con los siguientes requisitos en tu sistema antes de ejecutar la aplicación:

- **Node.js**: Asegúrate de tener Node.js instalado. Puedes descargarlo [aquí](https://nodejs.org/).

## Instalación Local

Sigue estos pasos para configurar y ejecutar el frontend de NetGrid en tu máquina local:

1. Clona este repositorio en tu máquina:

   ```bash
   git clone https://github.com/Palaciodiego008/netgrid-front.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd netgrid-front
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Inicia el servidor de desarrollo con hot-reloading:

   ```bash
   npm run serve
   ```

5. Abre tu navegador y accede a la aplicación en `http://localhost:8080`.

## Uso

La aplicación de NetGrid proporciona las siguientes funcionalidades:

- **Registro e Inicio de Sesión**: Los usuarios pueden registrarse e iniciar sesión en la aplicación.

- **Gestión de Proyectos**: Los usuarios pueden crear, ver, actualizar y eliminar proyectos.

- **Gestión de Tareas**: Los usuarios pueden crear, ver, actualizar y eliminar tareas dentro de los proyectos.

## Rutas y Enrutamiento

NetGrid utiliza Vue Router para la navegación. Aquí están algunas de las rutas principales:

- `/`: Página de inicio de sesión.
- `/register`: Página de registro de usuario.
- `/dashboard`: Panel de control principal (requiere autenticación).
- `/dashboard/projects`: Lista de proyectos.
- `/dashboard/create-project`: Formulario para crear un nuevo proyecto.
- `/dashboard/edit-project/:id`: Formulario para editar un proyecto existente.
- `/dashboard/projects/:id`: Detalles de un proyecto específico.
- `/dashboard/projects/:id/create-task`: Formulario para crear una nueva tarea en un proyecto.
- `/dashboard/projects/:projectId/tasks/:id`: Detalles de una tarea específica.
- `/dashboard/projects/:projectId/tasks/:id/edit`: Formulario para editar una tarea existente.

Asegúrate de autenticarte antes de acceder a las rutas que requieren autenticación.

## Comunicación con el Servidor

NetGrid utiliza Axios para comunicarse con el servidor backend. Axios facilita las solicitudes HTTP y permite interactuar con la API de backend de manera efectiva.