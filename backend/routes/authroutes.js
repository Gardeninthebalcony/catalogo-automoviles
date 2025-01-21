const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || 'tu_clave_secreta'; // Asegúrate de usar una clave segura y oculta

// Registro de usuario
router.post('/register', async (req, res) => {
  console.log('Datos recibidos:', req.body);
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Crear el nuevo usuario
    const user = new User({ name, email, password, role });

    console.log('Contraseña antes de guardar:', password);

    // Guardar el usuario en la base de datos
    await user.save();

    // Generar el token
    const token = jwt.sign(
      { id: user._id, role: user.role },  // Contenido del token
      SECRET_KEY,  // Clave secreta
      { expiresIn: '1h' }  // Expiración del token
    );

    // Responder con el token
    res.status(201).json({ message: 'Usuario registrado exitosamente', token });

  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Comparar la contraseña tal como está (sin hashing)
    if (password !== user.password) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    console.log('Contraseña ingresada:', password);
    console.log('Contraseña almacenada:', user.password);

    const token = jwt.sign(
      { id: user._id, role: user.role },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});

module.exports = router;


