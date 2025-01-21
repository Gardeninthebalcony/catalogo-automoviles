<template>
  <div class="DashboardPage">
    <h2>Bienvenido, {{ userName }}</h2>
    <div class="options">
      <button @click="goToVehicles">Ver Lista de Vehículos</button>
      <button @click="goToAddVehicle">Agregar Vehículo</button>
      <button @click="goToMap">Ver Mapa</button>
      <button @click="logout">Cerrar Sesión</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: '', // Inicializamos vacío para cargar el nombre dinámicamente
    };
  },
  methods: {
    loadUserName() {
  const userData = localStorage.getItem('user');
  if (userData) {
    try {
      const user = JSON.parse(userData);
      this.userName = user.name || 'Usuario'; // Asigna un valor predeterminado si el nombre no está disponible
    } catch (error) {
      console.error('Error al analizar datos del usuario:', error);
      this.userName = 'Usuario';
    }
  } else {
    this.userName = 'Usuario';
  }
}
,
    goToVehicles() {
      this.$router.push('/vehicles');
    },
    goToAddVehicle() {
      this.$router.push('/add-vehicle');
    },
    goToMap() {
      this.$router.push('/mapview');
    },
    logout() {
      localStorage.removeItem('token'); // Borrar el token del localStorage
      localStorage.removeItem('user');  // Borrar los datos del usuario si es necesario
      this.$router.push('/'); // Redirigir a la página principal
    },
  },
  mounted() {
    this.loadUserName(); // Cargar el nombre del usuario cuando el componente se monta
  },
};
</script>

<style scoped>
.DashboardPage {
  text-align: center;
  padding: 20px;
}

button {
  margin: 10px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
