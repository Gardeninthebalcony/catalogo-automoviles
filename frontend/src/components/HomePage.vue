<head>
  <title>Spore Cars</title>
</head>

<template>
  <div class="HomePage">
    <h1>Bienvenido a nuestro sistema de vehículos</h1>
    <p>Por favor, inicie sesión o cree un perfil para continuar</p>
    <button @click="goToLogin">Iniciar Sesión</button>
    <button @click="goToRegister">Crear Perfil</button>
  </div>
</template>

<script>
export default {
  methods: {
    goToLogin() {
      this.$router.push('/login');
    },
    goToRegister() {
      this.$router.push('/register');
    },
  },
};
</script>

<style scoped>
.HomePage {
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
