<template>
  <div class="container">
    <!-- Contenedor del Mapa -->
    <div class="map-container">
      <h2>Mapa de Vehículos</h2>
      <div id="map"></div>
    </div>
    <!-- Contenedor de la tabla -->
    <div class="vehicle-list">
      <h3>Lista de Vehículos</h3>
      <table>
        <thead>
          <tr>
            <th>Placa</th>
            <th>Marca</th>
            <th>Latitud</th>
            <th>Longitud</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="vehicle in vehicles" :key="vehicle._id">
            <td>{{ vehicle.licensePlate }}</td>
            <td>{{ vehicle.brand }}</td>
            <td>{{ vehicle.position.lat }}</td>
            <td>{{ vehicle.position.lng }}</td>
            <td>
              <button @click="updatePosition(vehicle)">Actualizar Posición</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Botón para redirigir al dashboard -->
      <div class="dashboard-btn-container">
        <button @click="goToDashboard" class="dashboard-btn">Ir al Dashboard</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';  // Asegúrate de importar los estilos

export default {
  name: 'MapView',
  data() {
    return {
      map: null,
      vehicleMarkers: [],
      vehicles: []
    };
  },
  methods: {
    async fetchVehicles() {
      try {
        const response = await axios.get('http://localhost:5000/vehicles', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        this.vehicles = response.data;
        this.updateVehicleMarkers();
      } catch (error) {
        console.error('Error al obtener los vehículos', error);
      }
    },

    updateVehicleMarkers() {
      const existingMarkers = new Map();
      this.vehicleMarkers.forEach(marker => {
        existingMarkers.set(marker.options.id, marker);
      });

      this.vehicles.forEach(vehicle => {
        const position = vehicle.position;
        if (position && position.lat && position.lng) {
          const latLng = L.latLng(position.lat, position.lng);
          const existingMarker = existingMarkers.get(vehicle._id);
          if (existingMarker) {
            existingMarker.setLatLng(latLng).bindPopup(`<b>Placa:</b> ${vehicle.licensePlate}<br><b>Marca:</b> ${vehicle.brand}`);
            existingMarkers.delete(vehicle._id);
          } else {
            const marker = L.marker(latLng, { id: vehicle._id }).addTo(this.map)
              .bindPopup(`<b>Placa:</b> ${vehicle.licensePlate}<br><b>Marca:</b> ${vehicle.brand}`);
            this.vehicleMarkers.push(marker);
          }
        }
      });

      existingMarkers.forEach(marker => marker.remove());
      this.vehicleMarkers = this.vehicleMarkers.filter(marker => !existingMarkers.has(marker.options.id));
    },

    initMap() {
      this.map = L.map('map').setView([20.6597, -103.3496], 12);  // Centrado en Guadalajara
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(this.map);

      this.map.whenReady(() => {
        setTimeout(() => {
          this.map.invalidateSize();  // Asegura que el mapa ajuste su tamaño
        }, 300);
      });
    },

    async updatePosition(vehicle) {
      const newLat = prompt(`Ingresa nueva latitud para el vehículo con placa ${vehicle.licensePlate}:`, vehicle.position.lat);
      const newLng = prompt(`Ingresa nueva longitud para el vehículo con placa ${vehicle.licensePlate}:`, vehicle.position.lng);

      if (newLat && newLng && !isNaN(newLat) && !isNaN(newLng)) {
        try {
          await axios.put(`http://localhost:5000/vehicles/${vehicle._id}`, {
            position: {
              lat: parseFloat(newLat),
              lng: parseFloat(newLng)
            }
          });

          alert('Posición actualizada correctamente');
          this.fetchVehicles();  // Actualizar la lista de vehículos después de la actualización
        } catch (error) {
          console.error('Error al actualizar la posición del vehículo', error);
          alert('Error al actualizar la posición');
        }
      } else {
        alert('Latitud o longitud inválidas');
      }
    },

    goToDashboard() {
      this.$router.push('/dashboard'); // Redirige al dashboard
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initMap(); // Llamar después de asegurarse que el DOM está listo
      this.fetchVehicles();
    });
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.map-container {
  width: 65%;
  height: 500px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

#map {
  width: 100%;
  height: 100%;
}

.vehicle-list {
  width: 30%;
  height: 500px;
  overflow-y: auto;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

th {
  background-color: #4CAF50;
  color: white;
}

td {
  background-color: #f2f2f2;
}

h2, h3 {
  font-family: Arial, sans-serif;
  color: #333;
  margin-bottom: 10px;
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
</style>
