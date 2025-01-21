<template>
  <div class="vehicle-list-container">
    <h2>Lista de Vehículos</h2>

    <!-- Formulario de edición, solo visible cuando editando un vehículo -->
    <div v-if="editingVehicle" class="edit-form">
      <h3>Editar Vehículo</h3>
      <form @submit.prevent="updateVehicle">
        <div>
          <label for="licensePlate">Placas:</label>
          <input type="text" v-model="editingVehicle.licensePlate" required />
        </div>
        <div>
          <label for="brand">Marca:</label>
          <input type="text" v-model="editingVehicle.brand" required />
        </div>
        <div>
          <label for="color">Color:</label>
          <input type="text" v-model="editingVehicle.color" required />
        </div>
        <div>
          <label for="model">Modelo:</label>
          <input type="text" v-model="editingVehicle.model" required />
        </div>
        <div>
          <label for="position">Posición:</label>
          <input type="text" v-model="editingVehicle.position" required />
        </div>
        <div>
          <label for="owner">Propietario:</label>
          <input type="text" v-model="editingVehicle.owner" required />
        </div>
        <button type="submit">Actualizar</button>
        <button type="button" @click="cancelEdit">Cancelar</button>
      </form>
    </div>

    <!-- Tabla de vehículos -->
    <table v-if="!editingVehicle">
      <thead>
        <tr>
          <th>Placas</th>
          <th>Marca</th>
          <th>Color</th>
          <th>Modelo</th>
          <th>Posición</th>
          <th>Propietario</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="vehicle in vehicles" :key="vehicle._id">
          <td>{{ vehicle.licensePlate }}</td>
          <td>{{ vehicle.brand }}</td>
          <td>{{ vehicle.color }}</td>
          <td>{{ vehicle.model }}</td>
          <td>{{ vehicle.position }}</td>
          <td>{{ vehicle.owner }}</td>
          <td>
            <button @click="editVehicle(vehicle)">Editar</button>
            <button @click="deleteVehicle(vehicle._id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Botón de redirección al dashboard -->
    <div class="dashboard-btn-container">
      <button @click="goToDashboard" class="dashboard-btn">Ir al Dashboard</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'VehicleList',
  data() {
    return {
      vehicles: [], // Lista de vehículos
      editingVehicle: null, // Vehículo en edición
    };
  },
  methods: {
    async fetchVehicles() {
      try {
        const response = await axios.get('http://localhost:5000/vehicles', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Asegúrate de tener autenticación
          },
        });
        this.vehicles = response.data;
      } catch (error) {
        alert('Error al obtener la lista de vehículos');
        console.error(error);
      }
    },
    async deleteVehicle(vehicleId) {
      try {
        const confirmed = confirm('¿Estás seguro de que deseas eliminar este vehículo?');
        if (confirmed) {
          await axios.delete(`http://localhost:5000/vehicles/${vehicleId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          alert('Vehículo eliminado exitosamente');
          this.fetchVehicles(); // Actualizar la lista después de eliminar
        }
      } catch (error) {
        alert('Error al eliminar el vehículo');
        console.error(error);
      }
    },
    editVehicle(vehicle) {
      // Asignamos el vehículo a "editingVehicle" para mostrar el formulario
      this.editingVehicle = { ...vehicle }; // Crear una copia del vehículo para evitar modificar el original
    },
    async updateVehicle() {
      try {
        await axios.put(
          `http://localhost:5000/vehicles/${this.editingVehicle._id}`,
          this.editingVehicle, // Mandamos los datos actualizados
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,

            },
          }
        );
        alert('Vehículo actualizado correctamente');
        this.fetchVehicles(); // Actualizamos la lista de vehículos después de la actualización
        this.editingVehicle = null; // Cerramos el formulario de edición
      } catch (error) {
        alert('Error al actualizar el vehículo');
        console.error(error);
      }
    },
    cancelEdit() {
      this.editingVehicle = null; // Cerrar el formulario de edición
    },
    goToDashboard() {
      this.$router.push('/dashboard'); // Redirige al dashboard
    },
  },
  mounted() {
    this.fetchVehicles();
  },
};
</script>

<style scoped>
.vehicle-list-container {
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.edit-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

form div {
  margin-bottom: 10px;
}

form label {
  display: block;
  margin-bottom: 5px;
}

form input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

form button {
  background-color: #008CBA;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

form button:hover {
  background-color: #007B9E;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

button {
  padding: 5px 10px;
  margin-right: 5px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

button:last-child {
  background-color: #f44336;
}

button:last-child:hover {
  background-color: #e53935;
}

.dashboard-btn-container {
  text-align: center;
  margin-top: 20px;
}

.dashboard-btn {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.dashboard-btn:hover {
  background-color: #45a049;
}
</style>
