const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  licensePlate: { type: String, required: true, unique: true },
  brand: { type: String, required: true },
  color: { type: String, required: true },
  model: { type: String, required: true },
  position: { 
    lat: { type: Number, required: true },  // Latitud
  lng: { type: Number, required: true },  },
  
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Asegúrate de que `User` exista
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
