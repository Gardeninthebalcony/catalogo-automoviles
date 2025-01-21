const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  vehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }]
});

// Eliminamos el hash de la contraseña (por ahora)
module.exports = mongoose.model('User', userSchema);


/*const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  vehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }]
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    // Hasheamos la contraseña solo si ha sido modificada
    this.password = await bcrypt.hash(this.password, 10);
  }
  next(); // Asegúrate de llamar a next() para continuar con el flujo de guardado
});

module.exports = mongoose.model('User', userSchema);
*/