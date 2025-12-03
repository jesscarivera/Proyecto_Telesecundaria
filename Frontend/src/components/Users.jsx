import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalReutilizable from "../components/ModalReutilizable";
import { Eye, Pencil, Trash2 } from "lucide-react";
import "./Users.css";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  const esDirector = true;

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [rol, setRol] = useState("maestro");
  const [estatus, setEstatus] = useState("activo");

  const [modal, setModal] = useState(null);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  // Cargar usuarios
  const cargarUsuarios = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/usuarios/obtener");
      setUsuarios(res.data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const abrirAgregar = () => {
    setNombre("");
    setApellido("");
    setCorreo("");
    setContraseña("");
    setRol("maestro");
    setEstatus("activo");
    setModal("agregar");
  };

  const abrirVer = (u) => {
    const filtrado = { ...u };

    delete filtrado.id;
    delete filtrado.createdAt;
    delete filtrado.updatedAt;

    setUsuarioSeleccionado(filtrado);
    setModal("ver");
  };

  const abrirEditar = (u) => {
    setUsuarioSeleccionado(u);
    setNombre(u.nombre);
    setApellido(u.apellido);
    setCorreo(u.correo);
    setContraseña("");
    setRol(u.rol);
    setEstatus(u.estatus);
    setModal("editar");
  };

  const abrirEliminar = (u) => {
    setUsuarioSeleccionado(u);
    setModal("eliminar");
  };

  // Crear
  const agregarUsuario = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/usuarios/agregar", {
        nombre,
        apellido,
        correo,
        contraseña,
        rol,
        estatus,
      });

      cargarUsuarios();
      setModal(null);
    } catch (error) {
      console.error("Error al agregar usuario:", error);
    }
  };

  // Editar
  const editarUsuario = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:3000/api/usuarios/editar/${usuarioSeleccionado.id}`,
        {
          nombre,
          apellido,
          correo,
          contraseña: esDirector ? contraseña || undefined : undefined,
          rol,
          estatus,
        }
      );

      cargarUsuarios();
      setModal(null);
    } catch (error) {
      console.error("Error al editar usuario:", error);
    }
  };

  // Eliminar
  const eliminarUsuario = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/api/usuarios/eliminar/${usuarioSeleccionado.id}`
      );

      cargarUsuarios();
      setModal(null);
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  return (
    <div className="users-container">
      <div className="users-list">
        <h3 className="titulo">Administrar Usuarios</h3>

        {usuarios.map((u) => (
          <div className="user-card" key={u.id}>
            <div className="user-icon">👤</div>

            <div className="user-info">
              <h4>
                {u.nombre} {u.apellido}
              </h4>
              <p>{u.correo}</p>
            </div>

            <span className={`badge ${u.rol === "director" ? "admin" : "user"}`}>
              {u.rol}
            </span>

            <div className="user-actions">
              <button className="view-btn" onClick={() => abrirVer(u)}>
                <Eye size={20} />
              </button>

              <button className="edit-btn" onClick={() => abrirEditar(u)}>
                <Pencil size={20} />
              </button>

              <button className="delete-btn" onClick={() => abrirEliminar(u)}>
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="users-form">
        <h3>➕ Agregar Usuario</h3>
        <button className="btn-create" onClick={abrirAgregar}>
          Nuevo Usuario
        </button>
      </div>

      {/* MODALES */}
      {modal && (
        <ModalReutilizable
          tipo={modal}
          titulo={
            modal === "ver"
              ? "Información del Usuario"
              : modal === "agregar"
              ? "Agregar Usuario"
              : modal === "editar"
              ? "Editar Usuario"
              : "Eliminar Usuario"
          }
          onClose={() => setModal(null)}
          onSubmit={
            modal === "agregar"
              ? agregarUsuario
              : modal === "editar"
              ? editarUsuario
              : eliminarUsuario
          }
          datos={usuarioSeleccionado}
          nombreElemento={
            usuarioSeleccionado
              ? `${usuarioSeleccionado.nombre || ""} ${usuarioSeleccionado.apellido || ""}`
              : ""
          }
        >
          {(modal === "agregar" || modal === "editar") && (
            <>
              <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />

              <input
                type="text"
                placeholder="Apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />

              <input
                type="email"
                placeholder="Correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />

              {(modal === "agregar" || esDirector) && (
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                />
              )}

              <select value={rol} onChange={(e) => setRol(e.target.value)}>
                <option value="maestro">Maestro</option>
                <option value="director">Director</option>
              </select>

              <select value={estatus} onChange={(e) => setEstatus(e.target.value)}>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
                <option value="suspendido">Suspendido</option>
              </select>
            </>
          )}
        </ModalReutilizable>
      )}
    </div>
  );
}
