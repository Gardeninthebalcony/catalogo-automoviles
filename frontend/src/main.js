import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index'; // Importa el router

const app = createApp(App);
app.use(router); // El uso del router debe ser antes de mount
app.mount('#app'); // mount debe ser la última llamada