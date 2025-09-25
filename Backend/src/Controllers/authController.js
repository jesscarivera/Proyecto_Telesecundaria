const bcrypt = require('bcrypt');
const Usuario = require('../Models/Usuarios');

const login = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    const valida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!valida) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    res.json({
      mensaje: 'Login exitoso',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        rol: usuario.rol
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

module.exports = { login };
