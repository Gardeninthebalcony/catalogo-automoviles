import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/HomePage.vue';
import Login from '../components/Login-Component.vue';
import Register from '../components/Register-Component.vue';
import VehiclesList from '../components/VehicleList.vue';
import AddVehicle from '../components/AddVehicle.vue';
import MapView from '../components/MapView.vue';
import Dashboard from '../components/DashboardPage.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/vehicles', component: VehiclesList },
  { path: '/add-vehicle', component: AddVehicle },
  { path: '/mapview', component: MapView },
  { path: '/dashboard', component: Dashboard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
/*import { createRouter, createWebHistory } from 'vue-router';
import VehicleList from '../components/VehicleList.vue';
import AddVehicle from '../components/AddVehicle.vue';
import Login from '../components/Login-Component.vue';
import Register from '../components/Register-Component.vue';
import MapView from '../components/MapView.vue';

const routes = [
  { path: '/', name: 'home', component: VehicleList },
  { path: '/add-vehicle', name: 'add-vehicle', component: AddVehicle },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  { path: '/MapView', name: 'map', component: MapView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
*/