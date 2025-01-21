require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Importa el paquete cors
const mongoose = require('mongoose');
const authRoutes = require('./routes/authroutes');
const vehiclesRoutes = require('./routes/vehicleRoutes');
const app = express();

// Middleware para parsear JSON
app.use(express.json());
app.use(cors());
app.use('/vehicles', require('./routes/vehicleRoutes'));
app.use('/auth', authRoutes);  // Usa las rutas de autenticación en el prefijo /auth
// Conexión a MongoDB Atlas
const dbUri = process.env.MONGODB_URI;
console.log('Intentando conectar a la base de datos con URI:', dbUri);

mongoose.connect(dbUri)
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
  })
  .catch((err) => {
    console.error('Error de conexión a la base de datos:', err);
  });

// Rutas de vehículos
app.use('/vehicles', vehiclesRoutes);
app.use('/auth', authRoutes);  // Cambiar aquí a /auth

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Servidor funcionando!');
});

// Iniciar el servidor en el puerto 5000
app.listen(5000, () => {
  console.log('Servidor en ejecución en el puerto 5000');
});
