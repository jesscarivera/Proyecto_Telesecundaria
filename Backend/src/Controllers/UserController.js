const bcrypt = require('bcrypt');
const Usuario = require('../Models/Usuarios');

const agregarUsuario = async (req, res) => {
  const { nombre, apellido, correo, contraseña, rol } = req.body;

  try {
    const existe = await Usuario.findOne({ where: { correo } });
    if (existe) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    // Encriptar la contraseña
    const hash = await bcrypt.hash(contraseña, 10);

    // Crear usuario
    const usuario = await Usuario.create({
      nombre,
      apellido,
      correo,
      contraseña: hash,
      rol
    });

    res.status(201).json({
      mensaje: 'Usuario creado correctamente',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
        rol: usuario.rol
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear usuario' });
  }
};

module.exports = { agregarUsuario };
