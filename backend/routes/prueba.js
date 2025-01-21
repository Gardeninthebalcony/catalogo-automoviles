const bcrypt = require('bcryptjs');
const plainPassword = 'abc';
const hashedPassword = bcrypt.hashSync(plainPassword, 10);

console.log('Contraseña ingresada:', plainPassword);
console.log('Contraseña hasheada:', hashedPassword);

const isMatch = bcrypt.compareSync(plainPassword, hashedPassword);
console.log('¿Las contraseñas coinciden?', isMatch);
