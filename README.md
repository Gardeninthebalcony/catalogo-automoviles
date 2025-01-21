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

### Clonar el Repositorio

```bash
$ git clone https://github.com/Gardeninthebalcony/catalogo-automoviles.git
$ cd catalogo-automoviles
```

### Configurar el Backend

1. Navega a la carpeta `server`:
   ```bash
   $ cd server
   ```
2. Instala las dependencias:
   ```bash
   $ npm install
   ```
3. Crea un archivo `.env` basado en el ejemplo `.env.example` y proporciona tus propias variables de entorno:
   ```plaintext
   PORT=5000
   MONGO_URI=<tu_conexion_mongodb>
   JWT_SECRET=<tu_clave_secreta_jwt>
   ```
4. Inicia el servidor:
   ```bash
   $ npm start
   ```

### Configurar el Frontend

1. Navega a la carpeta `client`:
   ```bash
   $ cd ../client
   ```
2. Instala las dependencias:
   ```bash
   $ npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   $ npm run serve
   ```

### Acceso a la Aplicación

- Abre tu navegador y visita `http://localhost:8080` para acceder al frontend.

## Comandos útiles

- **Iniciar el servidor de backend**:
  ```bash
  $ npm start
  ```
- **Iniciar el servidor de frontend**:
  ```bash
  $ npm run serve
  ```

## Notas

- Asegúrate de que MongoDB esté ejecutándose antes de iniciar el backend.
- Las credenciales de autenticación deben estar correctamente configuradas para el uso del JWT.

## Problemas Comunes

- Si el mapa aparece en blanco, verifica que `this.map.invalidateSize()` esté siendo llamado después de renderizar el mapa.
- Si `git push` no funciona, intenta ejecutar `git pull origin main --rebase` antes de volver a intentarlo.

---

**Autor**: Diego Tristán Martinez Rivera
