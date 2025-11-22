import React, { useState } from "react";
import { Search, Eye, Pencil, Trash2, PlusCircle, X } from "lucide-react";
import "../components/Alumnos.css";

const Alumnos = () => {
  const alumnos = [
    { id: 1, nombre: "Ana Sofía Castro García", grado: "1°", grupo: "A", estatus: "Activo" },
    { id: 2, nombre: "Ricardo Gómez Fuentes", grado: "2°", grupo: "B", estatus: "Activo" },
    { id: 3, nombre: "Luis Armando Pérez Soto", grado: "3°", grupo: "A", estatus: "Suspendido" },
    { id: 4, nombre: "Karla Daniela Ramos Vera", grado: "1°", grupo: "B", estatus: "Dado de Baja" },
    { id: 5, nombre: "Javier Torres Vera", grado: "2°", grupo: "A", estatus: "Activo" }
  ];

  const [modalType, setModalType] = useState(null);
  const [selected, setSelected] = useState(null);

  const abrirModal = (tipo, alumno) => {
    setModalType(tipo);
    setSelected(alumno);
  };

  const cerrarModal = () => {
    setModalType(null);
    setSelected(null);
  };

  return (
    <div className="contenedor-alumnos">
      <h2>Alumnos</h2>

      {/* === Búsqueda y Filtros === */}
      <div className="busqueda-filtros">
        <div className="barra-busqueda">
          <Search className="icono" size={18} />
          <input type="text" placeholder="Buscar..." />
        </div>
        <button className="btn-buscar">Buscar</button>

        <div className="filtro-grupo">
          <label>Filtrar</label>
          <select>
            <option>Grupo...</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>
        </div>

        <button className="btn-agregar">
          <PlusCircle size={18} /> Agregar Nuevo Alumno
        </button>
      </div>

      {/* === Tabla === */}
      <table className="tabla-alumnos">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Grado</th>
            <th>Grupo</th>
            <th>Estatus</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.nombre}</td>
              <td>{a.grado}</td>
              <td>{a.grupo}</td>
              <td>{a.estatus}</td>
              <td className="acciones">
                <Pencil className="editar" size={18} title="Modificar" onClick={() => abrirModal("editar", a)} />
                <Eye className="ver" size={18} title="Ver detalles" onClick={() => abrirModal("ver", a)} />
                <Trash2 className="eliminar" size={18} title="Eliminar" onClick={() => abrirModal("eliminar", a)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ========== MODALES ========== */}
      {modalType && selected && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-cerrar" onClick={cerrarModal}>
              <X size={20} />
            </button>

            {/* === Ver === */}
            {modalType === "ver" && (
              <>
                <h3>👁️ Detalles del Alumno</h3>
                <p><b>Nombre:</b> {selected.nombre}</p>
                <p><b>Grado:</b> {selected.grado}</p>
                <p><b>Grupo:</b> {selected.grupo}</p>
                <p><b>Estatus:</b> {selected.estatus}</p>
              </>
            )}

            {/* === Editar === */}
            {modalType === "editar" && (
              <>
                <h3>✏️ Editar Alumno</h3>
                <form className="modal-form">
                  <label>Nombre</label>
                  <input type="text" defaultValue={selected.nombre} />

                  <label>Grado</label>
                  <input type="text" defaultValue={selected.grado} />

                  <label>Grupo</label>
                  <input type="text" defaultValue={selected.grupo} />

                  <label>Estatus</label>
                  <input type="text" defaultValue={selected.estatus} />

                  <button className="btn-guardar">Guardar Cambios</button>
                </form>
              </>
            )}

            {/* === Eliminar === */}
            {modalType === "eliminar" && (
              <>
                <h3>⚠️ ¿Eliminar Alumno?</h3>
                <p>¿Desea eliminar a <b>{selected.nombre}</b> del registro?</p>
                <button className="btn-eliminar-confirmar">Sí, eliminar</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Alumnos;
