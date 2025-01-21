
const Vehicle = require('../models/Vehicle');

exports.getVehicles = async (req, res) => {
    try {
      const userRole = req.user.role;  // Obtén el rol del usuario desde la autenticación
      const userId = req.user.id;      // Obtén el ID del usuario autenticado
      
      let vehicles;
      if (userRole === 'admin') {
        // Los administradores pueden ver todos los vehículos
        vehicles = await Vehicle.find();
      } else {
        // Los usuarios solo ven los vehículos que les pertenecen
        vehicles = await Vehicle.find({ owner: userId });  // Asegúrate de tener un campo 'owner' en el modelo Vehicle
      }
      
      res.json(vehicles);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los vehículos', error });
    }
  };
  