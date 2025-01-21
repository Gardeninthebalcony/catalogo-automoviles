
const Vehicle = require('../models/Vehicle');

exports.getVehicles = async (req, res) => {
    try {
      const userRole = req.user.role;  // rol del usuario desde la autenticación
      const userId = req.user.id;      // ID del usuario autenticado
      
      let vehicles;
      if (userRole === 'admin') {
        // Los administradores pueden ver todos los vehículos
        vehicles = await Vehicle.find();
      } else {
        // Los usuarios solo ven los vehículos que les pertenecen
        vehicles = await Vehicle.find({ owner: userId });  
      }
      
      res.json(vehicles);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los vehículos', error });
    }
  };
  
