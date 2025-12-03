const Event = require('../Models/Events');
const { Op } = require("sequelize");

// Obtener todos los eventos 
const getEvents = async (req, res) => {
  try {
    const events = await Event.findAll({ order: [['date', 'ASC']] });
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los eventos' });
  }
};

// Crear evento
const createEvent = async (req, res) => {
  try {
    const { name, date, description } = req.body;

    const event = await Event.create({
      name,
      date,
      description,
      notified: false   
    });

    res.status(201).json(event);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Error al crear el evento' });
  }
};

// Actualizar evento
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, date, description, notified } = req.body;

    const event = await Event.findByPk(id);
    if (!event) return res.status(404).json({ error: 'Evento no encontrado' });

    await event.update({ name, date, description, notified });

    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Error al actualizar el evento' });
  }
};

// Eliminar evento
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findByPk(id);
    if (!event) return res.status(404).json({ error: 'Evento no encontrado' });

    await event.destroy();
    res.json({ message: 'Evento eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar el evento' });
  }
};

// Marcar como notificado
const markAsNotified = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findByPk(id);
    if (!event) return res.status(404).json({ error: "Evento no encontrado" });

    event.notified = true;
    await event.save();

    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al marcar como notificado" });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  markAsNotified
};
