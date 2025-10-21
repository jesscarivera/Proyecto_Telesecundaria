const Group = require('../Models/Groups');

// Crear grupo
const createGroup = async (req, res) => {
  try {
    const { name } = req.body;

    // Validar si ya existe
    const exists = await Group.findOne({ where: { name } });
    if (exists) {
      return res.status(400).json({ mensaje: 'El grupo ya existe' });
    }

    const group = await Group.create({ name });
    res.status(201).json({ mensaje: 'Grupo creado correctamente', group });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el grupo', error: error.message });
  }
};

// Obtener todos los grupos
const getGroups = async (req, res) => {
  try {
    const groups = await Group.findAll();
    res.status(200).json(groups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener grupos', error: error.message });
  }
};

// Obtener grupo por ID
const getGroupById = async (req, res) => {
  const { id } = req.params;
  try {
    const group = await Group.findByPk(id);
    if (!group) return res.status(404).json({ mensaje: 'Grupo no encontrado' });
    res.status(200).json(group);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener grupo', error: error.message });
  }
};

// Actualizar grupo
const updateGroup = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const group = await Group.findByPk(id);
    if (!group) return res.status(404).json({ mensaje: 'Grupo no encontrado' });

    await group.update({ name: name || group.name });
    res.status(200).json({ mensaje: 'Grupo actualizado correctamente', group });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar grupo', error: error.message });
  }
};

// Eliminar grupo
const deleteGroup = async (req, res) => {
  const { id } = req.params;
  try {
    const group = await Group.findByPk(id);
    if (!group) return res.status(404).json({ mensaje: 'Grupo no encontrado' });

    await group.destroy();
    res.status(200).json({ mensaje: 'Grupo eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar grupo', error: error.message });
  }
};

module.exports = {
  createGroup,
  getGroups,
  getGroupById,
  updateGroup,
  deleteGroup
};
