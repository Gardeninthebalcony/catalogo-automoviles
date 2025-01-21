const express = require('express');
const Vehicle = require('../models/Vehicle');  // Asegúrate de que el modelo de Vehículo esté correcto
const router = express.Router();
const auth = require('../middleware/auth');
const vehicleController = require('../controller/VehicleController');

// Ruta para agregar un vehículo
router.post('/', async (req, res) => {
  const { licensePlate, brand, color, model, position, owner } = req.body;

  try {
    const vehicle = new Vehicle({
      licensePlate,
      brand,
      color,
      model,
      position: {
        lat: position.lat,  // Latitud
        lng: position.lng,  // Longitud
      },
      owner
    });
    
    if (!position || !position.lat || !position.lng || typeof position.lat !== 'number' || typeof position.lng !== 'number') {
      return res.status(400).json({ message: 'Las coordenadas de la posición no son válidas' });
    }
    
    await vehicle.save();  // Guarda el vehículo en la base de datos
    res.status(201).json(vehicle);  // Devuelve el vehículo recién creado
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar el vehículo', error });
  }
});

// Ruta para obtener todos los vehículos
router.get('/', auth.authenticate, vehicleController.getVehicles);  // Aplica el middleware aquí




router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { licensePlate, brand, color, model, position, owner } = req.body;

    // Verifica si la posición está definida y tiene lat y lng
    if (!position || !position.lat || !position.lng) {
      return res.status(400).json({ message: 'Posición no válida', error: 'Posición mal formada' });
    }

    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      id,
      { 
        licensePlate,
        brand,
        color,
        model,
        position: {
          lat: position.lat,  // Latitud
          lng: position.lng,  // Longitud
        },
        owner
      },
      { new: true }
    );

    if (!updatedVehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json(updatedVehicle);
  } catch (error) {
    console.error(error); // Log detallado del error
    res.status(500).json({ message: 'Error updating vehicle', error: error.message });
  }
});

// Ruta para eliminar un vehículo

router.delete('/:id', async (req, res) => {  // Nota el 'async' aquí
  const { id } = req.params;
  console.log(`Solicitud DELETE para vehículo con ID: ${id}`);

  try {
    // Usamos 'await' porque estamos esperando la respuesta de la base de datos
    const vehicle = await Vehicle.findByIdAndDelete(id);

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehículo no encontrado' });
    }

    res.status(200).json({ message: 'Vehículo eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el vehículo', error: error.message });
  }
});



////////////////////////////////////////////////////////////////

// Ruta para obtener las posiciones de los vehículos (en tiempo real)
router.get('/positions', async (req, res) => {
  try {
    const vehicles = await Vehicle.find();  // Obtiene todos los vehículos
    const positions = vehicles.map(vehicle => ({
      _id: vehicle._id,
      licensePlate: vehicle.licensePlate,
      position: vehicle.position,
    }));

    res.json(positions);  // Devuelve las posiciones de los vehículos
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las posiciones de los vehículos', error });
  }
});



module.exports = router;

/*router.get('/', protect, async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate('owner', 'name email'); // Relacionar el propietario del vehículo
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los vehículos', error });
  }
});*/