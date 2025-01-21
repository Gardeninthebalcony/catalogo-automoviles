<template>
  <div class="register-container">
    <h2>Registrar Usuario</h2>
    <form @submit.prevent="register" class="register-form">
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input type="text" v-model="name" id="name" placeholder="Ingresa tu nombre" required />
      </div>
      <div class="form-group">
        <label for="email">Correo Electrónico:</label>
        <input type="email" v-model="email" id="email" placeholder="Ingresa tu correo electrónico" required />
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input type="password" v-model="password" id="password" placeholder="Ingresa tu contraseña" required />
      </div>
      <div class="form-group">
        <label for="role">Rol:</label>
        <select v-model="role" id="role" required>
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>
      </div>
      <button type="submit" class="submit-btn">Registrar</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  name: 'RegisterComponent',
  setup() {
    const router = useRouter();
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const role = ref('user'); // Valor predeterminado

    const register = async () => {
      console.log('Intentando registrar usuario...');
      try {
        const response = await axios.post('http://localhost:5000/auth/register', {
          name: name.value,
          email: email.value,
          password: password.value,
          role: role.value,
        });
        alert('Registro exitoso');
        console.log(response.data);

        // Guardar el token en localStorage
const token = response.data.token; // Asegúrate de que 'token' sea la propiedad correcta
if (token) {
  localStorage.setItem('token', token);
  console.log("Token guardado:", token);
} else {
  console.log("Token no recibido o mal formado");
}
console.log(localStorage.getItem('token')); // Verifica que el token esté en localStorage

        // Redirigir al Dashboard después de un registro exitoso
        router.push('/dashboard');
      } catch (error) {
        alert('Error en el registro');
        console.error(error);
      }
    };

    return {
      name,
      email,
      password,
      role,
      register,
    };
  },
};
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.register-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 14px;
  font-weight: bold;
  color: #555;
}

input, select {
  width: 100%;
  padding: 12px;
  margin-top: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
}

input:focus, select:focus {
  border-color: #4CAF50;
  outline: none;
}

button.submit-btn {
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button.submit-btn:hover {
  background-color: #45a049;
}
</style>
