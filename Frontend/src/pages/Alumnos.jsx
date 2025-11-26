import React, { useState } from "react";
import { GraduationCap, Pencil, Trash2, Eye, Plus } from "lucide-react";
import "./Alumnos.css";

export default function Alumnos() {
  // Lista vacía de alumnos
  const [alumnos] = useState([]);

  // Grupo seleccionado
  const [grupoSeleccionado, setGrupoSeleccionado] = useState("");

  // Grupos mostrados en óvalos
  const grupos = [
    "1A", "1B", "1C",
    "2A", "2B", "2C",
    "3A", "3B", "3C"
  ];

  // Filtrar alumnos por grupo
  const alumnosFiltrados = grupoSeleccionado
    ? alumnos.filter(a => `${a.grado}${a.grupo}` === grupoSeleccionado)
    : alumnos;

  return (
    <div className="inventory-container">

      {/* Título */}
      <div className="inv-header">
        <div>
          <h1 className="inv-title">
            <GraduationCap className="inv-icon" size={38} />
            Alumnos
          </h1>
          <p className="inv-subtitle">Control general de estudiantes</p>
        </div>

        {/* Tarjetas del lado derecho */}
        <div className="inv-summary-boxes right-corner">
          <div className="inv-summary-card">
            <p className="inv-summary-title">Total de alumnos</p>
            <p className="inv-summary-value">{alumnos.length}</p>
          </div>

          <div className="inv-summary-card">
            <p className="inv-summary-title">Activos</p>
            <p className="inv-summary-value">
              {alumnos.filter(a => a.estatus === "Activo").length}
            </p>
          </div>
        </div>
      </div>

      {/* Óvalos de grupos */}
      <div className="grupo-oval-container">
        {grupos.map(g => (
          <div
            key={g}
            className={`grupo-oval ${grupoSeleccionado === g ? "activo" : ""}`}
            onClick={() =>
              setGrupoSeleccionado(grupoSeleccionado === g ? "" : g)
            }
          >
            {g}
          </div>
        ))}
      </div>

      {/* Buscar + botón agregar */}
      <div className="inv-controls">
        <div className="inv-search-box">
          <input type="text" placeholder="Buscar alumno..." />
        </div>

        <button className="btn-add">
          <Plus size={18} /> Agregar Alumno
        </button>
      </div>

      {/* Tabla */}
      <div className="inv-table-wrapper">
        <table className="inv-table">
          <thead>
            <tr>
              <th>Matrícula</th>
              <th>Nombre</th>
              <th>Grado</th>
              <th>Grupo</th>
              <th>Estatus</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {alumnosFiltrados.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">
                  No hay alumnos registrados
                </td>
              </tr>
            ) : (
              alumnosFiltrados.map((al) => (
                <tr key={al.id}>
                  <td>{al.matricula}</td>
                  <td>{al.nombre}</td>
                  <td>{al.grado}</td>
                  <td>{al.grupo}</td>
                  <td>
                    <span className="badge">{al.estatus}</span>
                  </td>

                  <td className="inv-actions">
                    <button className="act act-edit"><Pencil size={18} /></button>
                    <button className="act"><Eye size={18} /></button>
                    <button className="act act-del"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
