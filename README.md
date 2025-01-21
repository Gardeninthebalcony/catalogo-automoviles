# Catálogo de Automóviles

Este proyecto es una aplicación web para gestionar un catálogo de automóviles con funcionalidades como la visualización de un mapa, la administración de vehículos, y la autenticación de usuarios.

## Características

- **Autenticación de usuarios**: Registro e inicio de sesión.
- **Gestor de Vehículos**: Agregar, listar y actualizar la posición de los vehículos.
- **Visualización en Mapa**: Ubicación de los vehículos en un mapa interactivo utilizando Leaflet.

## Tecnologías Utilizadas

- **Frontend**: Vue.js
- **Backend**: Node.js con Express
- **Base de Datos**: MongoDB
- **Mapa**: Leaflet
- **Autenticación**: JWT (JSON Web Tokens)

## Requisitos Previos

- Node.js y npm instalados
- MongoDB funcionando
- Una cuenta de Git configurada

## Instrucciones para Ejecutar el Proyecto
Usando la consola de git
### Clonar el Repositorio


$ git clone https://github.com/Gardeninthebalcony/catalogo-automoviles.git
$ cd catalogo-automoviles


### Configurar el Backend
Utilice visual studio code:
abre una terminal y

1. Navega a la carpeta `backend`:
   
   $ cd backend
   
2. Instala las dependencias:

   $ npm install
   
3. Crea un archivo `.env` basado en el ejemplo `.env.example` y proporciona tus propias variables de entorno:
   
   PORT=5000
   MONGODB_URI=mongodb+srv://Admin:AdminPassword@spore.qaeme.mongodb.net/?retryWrites=true&w=majority&appName=Spore
   JWT_SECRET=tu_clave_secreta

   
4. Inicia el servidor:

   $ npm start
   

### Configurar el Frontend
En una nueva terminal

1. Navega a la carpeta `frontend`:
   
   $ cd ../frontend
   
2. Instala las dependencias:
   
   $ npm install
   
3. Inicia el servidor de desarrollo:
   
   $ npm run serve
   

### Acceso a la Aplicación

- Abre tu navegador y visita `http://localhost:8080` para acceder al frontend.

## Comandos útiles

- **Iniciar el servidor de backend**:
  
  $ npm start
  
- **Iniciar el servidor de frontend**:
  
  $ npm run serve
  

## Notas

- Asegúrate de que MongoDB esté ejecutándose antes de iniciar el backend.
- Las credenciales de autenticación deben estar correctamente configuradas para el uso del JWT.

## Problemas Comunes

- Si el mapa aparece en blanco, verifica que `this.map.invalidateSize()` esté siendo llamado después de renderizar el mapa.
- Si `git push` no funciona, intenta ejecutar `git pull origin main --rebase` antes de volver a intentarlo.

---

**Autor**: Diego Tristán Martinez Rivera
