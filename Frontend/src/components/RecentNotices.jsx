import React, { useState, useEffect } from "react";
import axios from "axios";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";
import ModalReutilizable from "../components/ModalReutilizable";
import "../components/RecentNotices.css";

export default function RecentNotices() {
  const [notices, setNotices] = useState([]);
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const [modal, setModal] = useState(null);

  const [formData, setFormData] = useState({
    titulo: "",
    mensaje: "",
    fecha: ""
  });

  const obtenerAvisos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/notices");
      setNotices(res.data || []);
    } catch (error) {
      console.log("Error al cargar avisos:", error);
    }
  };

  useEffect(() => {
    obtenerAvisos();
  }, []);

  //   ABRIR MODALES

  const abrirAgregar = () => {
    setFormData({
      titulo: "",
      mensaje: "",
      fecha: new Date().toISOString().slice(0, 16)
    });
    setModal({ tipo: "agregar" });
  };

  const abrirEditar = (aviso) => {
    setFormData({
      titulo: aviso.titulo || "",
      mensaje: aviso.mensaje || "",
      fecha: aviso.fecha ? aviso.fecha.slice(0, 16) : ""
    });

    setModal({ tipo: "editar", datos: aviso });
  };

  const abrirVer = (aviso) => {
    const avisoFiltrado = {
      titulo: aviso.titulo,
      mensaje: aviso.mensaje,
      fecha: aviso.fecha
    };
    setModal({ tipo: "ver", datos: avisoFiltrado });
  };

  const abrirEliminar = (aviso) => {
    setModal({ tipo: "eliminar", datos: aviso });
  };

  const cerrarModal = () => setModal(null);

  //   CRUD
 
  const handleAgregar = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/notices", formData);
      await obtenerAvisos();
      cerrarModal();
    } catch (error) {
      console.log("Error al agregar:", error);
    }
  };

  const handleEditar = async (e) => {
    e.preventDefault();
    try {
      const id = modal?.datos?.id;
      if (!id) {
        console.error("No se encontró id para editar");
        return;
      }

      await axios.put(`http://localhost:3000/api/notices/${id}`, formData);
      await obtenerAvisos();
      cerrarModal();
    } catch (error) {
      console.log("Error al editar:", error);
    }
  };

  const handleEliminar = async () => {
    try {
      const id = modal?.datos?.id;
      if (!id) {
        console.error("No se encontró id para eliminar");
        return;
      }
      await axios.delete(`http://localhost:3000/api/notices/${id}`);
      await obtenerAvisos();
      cerrarModal();
    } catch (error) {
      console.log("Error al eliminar:", error);
    }
  };

  //   LISTA

  const lista = notices;

  return (
    <div className="notices-container">

      <div className="notices-header">
        <h1 className="notices-title">📢 Avisos recientes</h1>

        <button className="btn-agregar" onClick={abrirAgregar}>
          <Plus size={20} />
          Nuevo aviso
        </button>
      </div>

      <div className="notices-list">
        {notices.length === 0 ? (
          <p className="no-data">No hay avisos registrados.</p>
        ) : (
          lista.map((n, idx) => {
            const visible = mostrarTodos || idx < 6;
            return (
              <div
                key={n.id}
                className="notice-card"
                style={{ display: visible ? "flex" : "none", alignItems: "center" }}
              >
                <div className="notice-info">
                  <h3 className="notice-title" style={{ margin: 0 }}>{n.titulo}</h3>
                  <p className="notice-date" style={{ marginTop: 4 }}>
                    {new Date(n.fecha).toLocaleString()}
                  </p>
                </div>

                <div className="notice-actions">
                  <button onClick={() => abrirVer(n)}>
                    <Eye />
                  </button>
                  <button onClick={() => abrirEditar(n)}>
                    <Pencil />
                  </button>
                  <button onClick={() => abrirEliminar(n)}>
                    <Trash2 />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {notices.length > 6 && (
        <button
          className="notices-see-more"
          onClick={() => setMostrarTodos((s) => !s)}
        >
          {mostrarTodos ? "Ver menos" : "Ver más"}
        </button>
      )}

      {modal && (
        <ModalReutilizable
          tipo={modal.tipo}
          titulo={
            modal.tipo === "ver"
              ? "Detalles del Aviso"
              : modal.tipo === "agregar"
              ? "Nuevo Aviso"
              : modal.tipo === "editar"
              ? "Editar Aviso"
              : "Eliminar Aviso"
          }
          datos={modal.datos}
          nombreElemento={modal?.datos?.titulo}
          onClose={cerrarModal}
          onSubmit={
            modal.tipo === "agregar"
              ? handleAgregar
              : modal.tipo === "editar"
              ? handleEditar
              : modal.tipo === "eliminar"
              ? handleEliminar
              : null
          }
        >
          {(modal.tipo === "agregar" || modal.tipo === "editar") && (
            <>
              <label>Título</label>
              <input
                type="text"
                value={formData.titulo}
                onChange={(e) =>
                  setFormData({ ...formData, titulo: e.target.value })
                }
                required
              />

              <label>Mensaje</label>
              <textarea
                rows="5"
                value={formData.mensaje}
                onChange={(e) =>
                  setFormData({ ...formData, mensaje: e.target.value })
                }
                required
              />

              <label>Fecha</label>
              <input
                type="datetime-local"
                value={formData.fecha}
                onChange={(e) =>
                  setFormData({ ...formData, fecha: e.target.value })
                }
                required
              />
            </>
          )}

          {modal.tipo === "ver" && (
            <>
              <p><strong>{modal.datos.titulo}</strong></p>
              <p>{modal.datos.mensaje}</p>
              <p className="notice-date">
                {new Date(modal.datos.fecha).toLocaleString()}
              </p>
            </>
          )}
        </ModalReutilizable>
      )}
    </div>
  );
}
