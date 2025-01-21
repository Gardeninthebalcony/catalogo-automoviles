const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  vehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }]
});

module.exports = mongoose.model('User', userSchema);


