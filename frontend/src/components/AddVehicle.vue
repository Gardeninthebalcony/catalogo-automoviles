<template>
  <div class="vehicle-form-container">
    <h2>Agregar Vehículo</h2>
    <form @submit.prevent="addVehicle">
      <label for="licensePlate">Placas:</label>
      <input type="text" v-model="vehicle.licensePlate" required />

      <label for="brand">Marca:</label>
      <input type="text" v-model="vehicle.brand" required />

      <label for="color">Color:</label>
      <input type="text" v-model="vehicle.color" required />

      <label for="model">Modelo:</label>
      <input type="text" v-model="vehicle.model" required />

      <label for="lat">Latitud:</label>
      <input type="number" v-model="vehicle.position.lat" required />

      <label for="lng">Longitud:</label>
      <input type="number" v-model="vehicle.position.lng" required />

      <label for="owner">Propietario:</label>
      <input type="text" v-model="vehicle.owner" required disabled />

      <button type="submit">Agregar Vehículo</button>
    </form>

    <!-- Botón para redirigir al dashboard -->
    <div class="dashboard-btn-container">
      <button @click="goToDashboard" class="dashboard-btn">Ir al Dashboard</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Importa jwtDecode de forma correcta

export default {
  data() {
    return {
      vehicle: {
        licensePlate: '',
        brand: '',
        color: '',
        model: '',
        position: {
          lat: 0,  // valor por defecto de latitud
          lng: 0,  // valor por defecto de longitud
        },
        owner: '',  // Este campo será llenado automáticamente
      },
    };
  },
  mounted() {
    this.setOwner(); // Llamada para llenar el propietario automáticamente
  },
  methods: {
    setOwner() {
      // Obtener el token del localStorage
      const token = localStorage.getItem('token');
if (token && token.split('.').length === 3) {
  const decodedToken = jwtDecode(token);
  this.vehicle.owner = decodedToken.id;
} else {
  console.log("Token no válido o mal formado");
  alert("Token no válido o ha expirado");
}

    },
    async addVehicle() {
      try {
        const response = await axios.post('http://localhost:5000/vehicles', this.vehicle, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Autenticación
          },
        });
        console.log('Vehículo agregado:', response.data);
        alert('Vehículo agregado exitosamente');
        this.resetForm();
      } catch (error) {
        console.error('Error al agregar el vehículo:', error);
        alert('Error al agregar el vehículo');
      }
    },
    resetForm() {
      this.vehicle = {
        licensePlate: '',
        brand: '',
        color: '',
        model: '',
        position: {
          lat: 0,
          lng: 0,
        },
        owner: '', // Deberá ser llenado automáticamente
      };
    },
    goToDashboard() {
      this.$router.push('/dashboard'); // Redirige al dashboard
    },
  },
};
</script>

<style scoped>
.vehicle-form-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

label {
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

form {
  display: flex;
  flex-direction: column;
}

.dashboard-btn-container {
  margin-top: 20px;
  text-align: center;
}

.dashboard-btn {
  background-color: #008CBA;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.dashboard-btn:hover {
  background-color: #007B9E;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 15px;
}
</style>
