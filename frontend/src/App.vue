<template>
  <div id="app">
    <nav style="display: none;">
     <ul>
      <router-link to="/">Lista de Vehículos</router-link> |
      <router-link to="/add-vehicle">Agregar Vehículo</router-link> |
      <router-link to="/login">Iniciar Sesión</router-link> |
      <router-link to="/register">Registrarse</router-link>
      <router-link to="/MapView">Mapa</router-link>
     </ul>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
nav {
  margin-bottom: 20px;
}
a {
  margin-right: 10px;
}
</style>
