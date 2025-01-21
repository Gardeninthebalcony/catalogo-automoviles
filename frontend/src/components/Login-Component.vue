<head>
  <title>Spore Cars</title>
</head>

<template>
  <div class="login-container">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Correo Electrónico</label>
        <input
          type="email"
          v-model="email"
          id="email"
          required
          placeholder="Ingresa tu correo electrónico"
        />
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input
          type="password"
          v-model="password"
          id="password"
          required
          placeholder="Ingresa tu contraseña"
        />
      </div>
      <div class="form-group">
        <button type="submit" class="btn">Iniciar Sesión</button>
      </div>
      <div v-if="errorMessage" class="error-message">
        <p>{{ errorMessage }}</p>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginComponent',
  data() {
    return {
      email: '',        // Usamos email en lugar de username
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async login() {
      try {
        // Hacemos la solicitud POST al backend para el login
        const response = await axios.post('http://localhost:5000/auth/login', {
          email: this.email,    // Enviamos el email y contraseña
          password: this.password
          
        });

        // Si la respuesta es exitosa, almacenamos el token en el localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        // Redirigimos al usuario a la página de vehículos
        this.$router.push('/dashboard');
      } catch (error) {
        // Si hay un error, mostramos el mensaje de error
        console.error('Error al iniciar sesión', error);
        this.errorMessage = 'Credenciales inválidas';
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  width: 100%;
  max-width: 400px;
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

.form-group {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
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

.error-message {
  color: red;
  text-align: center;
  margin-top: 15px;
}
</style>
