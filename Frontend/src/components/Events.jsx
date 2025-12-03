import React, { useEffect, useState } from "react";
import axios from "axios";
import { Eye, Pencil, Trash2, Bell, Plus, ChevronDown } from "lucide-react";
import "./Events.css";
import ModalReutilizable from "../components/ModalReutilizable";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [showAll, setShowAll] = useState(false); 
  const [modal, setModal] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    date: "",
  });

  // Cargar eventos 
  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/events/get");

      const clean = res.data.map((e) => ({
        ...e,
        date: new Date(e.date),
      }));

      const sorted = clean.sort((a, b) => a.date - b.date);

      setEvents(sorted);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleView = (ev) => {
    setSelectedEvent(ev);
    setModal("ver");
  };

  const handleEdit = (ev) => {
    setSelectedEvent(ev);

    setFormData({
      name: ev.name,
      date: new Date(ev.date).toISOString().slice(0, 16),
    });

    setModal("editar");
  };

 
  const handleDelete = (ev) => {
    setSelectedEvent(ev);
    setModal("eliminar");
  };

  const handleAdd = () => {
    setFormData({ name: "", date: "" });
    setModal("agregar");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (modal === "editar") {
        await axios.put(
          `http://localhost:3000/api/events/${selectedEvent.id}`,
          formData
        );
      } else if (modal === "agregar") {
        await axios.post("http://localhost:3000/api/events/add", formData);
      }

      fetchEvents();
      setModal(null);
    } catch (error) {
      console.log(error);
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/api/events/${selectedEvent.id}`
      );
      fetchEvents();
      setModal(null);
    } catch (error) {
      console.log(error);
    }
  };

  const oneDayLeft = (date) => {
    const today = new Date();
    const diff = date - today;
    return diff > 0 && diff <= 24 * 60 * 60 * 1000;
  };

  const visibleEvents = showAll ? events : events.slice(0, 5);

  return (
    <div className="events-container">
      <div className="header">
        <h2 className="title-events">📅 Eventos Cercanos</h2>

        <button className="btn-add-small" onClick={handleAdd}>
          <Plus size={14} /> Agregar
        </button>
      </div>

      <div className="events-list">
        {visibleEvents.map((ev) => (
          <div key={ev.id} className="event-card smooth-card">
            <div className="event-row">
              <h3>{ev.name}</h3>

              <div className="actions-inline">
                <button className="btn-secondary" onClick={() => handleView(ev)}>
                  <Eye size={18} />
                </button>

                <button className="btn-warning" onClick={() => handleEdit(ev)}>
                  <Pencil size={18} />
                </button>

                <button className="btn-danger" onClick={() => handleDelete(ev)}>
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <p className="event-date">
              {ev.date.toLocaleDateString()} —{" "}
              {ev.date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>

            {oneDayLeft(ev.date) && (
              <div className="notify-banner">
                <Bell size={16} className="bell-wiggle" />
                Falta 1 día
              </div>
            )}
          </div>
        ))}
      </div>

      {events.length > 5 && (
        <button className="btn-see-more" onClick={() => setShowAll(!showAll)}>
          Ver {showAll ? "menos" : "más"} <ChevronDown size={16} />
        </button>
      )}

      {modal && (
        <ModalReutilizable
          tipo={modal}
          titulo={
            modal === "ver"
              ? "Detalles del Evento"
              : modal === "editar"
              ? "Editar Evento"
              : modal === "agregar"
              ? "Agregar Evento"
              : "Eliminar Evento"
          }
          onClose={() => setModal(null)}
          onSubmit={modal === "eliminar" ? confirmDelete : handleSubmit}
          datos={
            modal === "ver"
              ? {
                  Título: selectedEvent.name,
                  Fecha: selectedEvent.date.toLocaleString(),
                }
              : null
          }
          nombreElemento={selectedEvent?.name}
        >
          {(modal === "editar" || modal === "agregar") && (
            <>
              <label>Título</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              <label>Fecha y hora</label>
              <input
                type="datetime-local"
                required
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </>
          )}
        </ModalReutilizable>
      )}
    </div>
  );
};

export default Events;
