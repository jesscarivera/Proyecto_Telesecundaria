const Notices = require("../Models/Notices");

// Obtener avisos
exports.obtenerAvisos = async (req, res) => {
  try {
    const avisos = await Notices.findAll({ order: [["fecha", "DESC"]] });
    res.json(avisos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener avisos" });
  }
};

// Crear avisos
exports.crearAviso = async (req, res) => {
  try {
    const { titulo, mensaje } = req.body;
    const aviso = await Notices.create({ titulo, mensaje });
    res.json(aviso);
  } catch (error) {
    res.status(500).json({ error: "Error al crear aviso" });
  }
};

// Actualizar avisos
exports.actualizarAviso = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, mensaje, fecha } = req.body;

    const aviso = await Notices.findByPk(id);
    if (!aviso) {
      return res.status(404).json({ message: "Aviso no encontrado" });
    }

    aviso.titulo = titulo;
    aviso.mensaje = mensaje;

    if (fecha) aviso.fecha = fecha;

    await aviso.save();

    res.json({ message: "Aviso actualizado correctamente", aviso });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar", error });
  }
};

// Eliminar avisos
exports.eliminarAviso = async (req, res) => {
  try {
    const { id } = req.params;
    await Notices.destroy({ where: { id } });
    res.json({ mensaje: "Aviso eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar aviso" });
  }
};
