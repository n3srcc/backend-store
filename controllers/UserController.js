const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserController = {
  async register(req, res) {
    const { username, password } = req.body;

    try {
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ error: 'El usuario ya existe' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ username, password: hashedPassword });
      const token = jwt.sign({ id: newUser.id, username: newUser.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(201).json({ token });
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      res.status(500).json({ error: 'Error al registrar usuario' });
    }
  },

  async login(req, res) {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
      }

      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({ token });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ error: 'Error al iniciar sesión' });
    }
  },

  async forgotPassword (req, res) {
    try {
      const { email } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al procesar la solicitud' });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { token, newPassword } = req.body;

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findByPk(decoded.id);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

      res.status(200).json({ message: 'Contraseña restablecida con éxito' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al procesar la solicitud' });
    }
  }
};

module.exports = UserController;
