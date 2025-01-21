const jwt = require('jsonwebtoken');
const SECRET_KEY = 'tu_clave_secreta'; // Usa tu clave secreta

module.exports = {
  authenticate: (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No se proporcionó un token' });
    }

    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded; // Agrega los datos del usuario al objeto `req`
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token inválido o expirado' });
    }
  }
};
