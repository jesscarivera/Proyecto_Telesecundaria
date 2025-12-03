import React, { useState, useEffect } from "react";
import axios from "axios";
import { GraduationCap, Pencil, Trash2, Eye, Plus } from "lucide-react";
import ModalReutilizable from "../components/ModalReutilizable";
import "../components/Alumnos.css";

export default function Alumnos() {
  const [alumnos, setAlumnos] = useState([]);
  const [grupoSeleccionado, setGrupoSeleccionado] = useState("");
  const [busqueda, setBusqueda] = useState("");

  // MODALES
  const [modalTipo, setModalTipo] = useState(null); 
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);

  const grupos = ["1A", "1B", "1C", "2A", "2B", "2C", "3A", "3B", "3C"];

// Cargar alumnos
  const loadAlumnos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/students/get");

      const mapped = res.data.map(a => ({
        id: a.id,
        matricula: a.enrollment,
        nombre: `${a.name} ${a.Last_Name}`,
        name: a.name,
        lastName: a.Last_Name,
        age: a.age,
        grado: a.grade,
        grupo: a.group
      }));

      setAlumnos(mapped);
    } catch (error) {
      console.error("Error cargando alumnos:", error);
    }
  };

  useEffect(() => {
    loadAlumnos();
  }, []);

  const alumnosBuscados = alumnos.filter(a =>
    a.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const alumnosFiltrados = grupoSeleccionado
    ? alumnosBuscados.filter(a => `${a.grado}${a.grupo}` === grupoSeleccionado)
    : alumnosBuscados;

  const abrirVer = (al) => {
    setAlumnoSeleccionado(al);
    setModalTipo("ver");
  };

  const abrirAgregar = () => {
    setAlumnoSeleccionado({
      name: "",
      lastName: "",
      matricula: "",
      age: "",
      grado: "",
      grupo: "",
    });
    setModalTipo("agregar");
  };

  const abrirEditar = (al) => {
    setAlumnoSeleccionado(al);
    setModalTipo("editar");
  };

  const abrirEliminar = (al) => {
    setAlumnoSeleccionado(al);
    setModalTipo("eliminar");
  };

  const cerrarModal = () => {
    setModalTipo(null);
    setAlumnoSeleccionado(null);
  };

// Agregar alumno
  const handleAgregar = async (e) => {
    e.preventDefault();

    try {
      const body = {
        name: alumnoSeleccionado.name,
        Last_Name: alumnoSeleccionado.lastName,
        enrollment: alumnoSeleccionado.matricula,
        age: Number(alumnoSeleccionado.age),
        grade: alumnoSeleccionado.grado,
        group: alumnoSeleccionado.grupo,
      };

      await axios.post("http://localhost:3000/api/students/add", body);

      loadAlumnos();
      cerrarModal();
    } catch (error) {
      console.error("Error agregando:", error);
    }
  };

// Editar alumno
  const handleEditar = async (e) => {
    e.preventDefault();

    try {
      const body = {
        name: alumnoSeleccionado.name,
        Last_Name: alumnoSeleccionado.lastName,
        age: Number(alumnoSeleccionado.age),
        grade: alumnoSeleccionado.grado,
        group: alumnoSeleccionado.grupo,
      };

      await axios.put(
        `http://localhost:3000/api/students/edit/${alumnoSeleccionado.matricula}`,
        body
      );

      loadAlumnos();
      cerrarModal();
    } catch (error) {
      console.error("Error editando:", error);
    }
  };

// Eliminar alumno
  const handleEliminar = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/api/students/delete/${alumnoSeleccionado.matricula}`
      );

      loadAlumnos();
      cerrarModal();
    } catch (error) {
      console.error("Error eliminando:", error);
    }
  };

  return (
    <div className="inventory-container">
      <div className="inv-header">
        <div>
          <h1 className="inv-title">
            <GraduationCap className="inv-icon" size={38} />
            Alumnos
          </h1>
          <p className="inv-subtitle">Control general de estudiantes</p>
        </div>

        <div className="inv-summary-boxes right-corner">
          <div className="inv-summary-card">
            <p className="inv-summary-title">Total de alumnos</p>
            <p className="inv-summary-value">{alumnos.length}</p>
          </div>

          <div className="inv-summary-card">
            <p className="inv-summary-title">Activos</p>
            <p className="inv-summary-value">{alumnos.length}</p>
          </div>
        </div>
      </div>

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

      <div className="inv-controls">
        <div className="inv-search-box">
          <input
            type="text"
            placeholder="Buscar alumno..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <button className="btn-add" onClick={abrirAgregar}>
          <Plus size={18} /> Agregar Alumno
        </button>
      </div>

      <div className="inv-table-wrapper">
        <table className="inv-table">
          <thead>
            <tr>
              <th>Matrícula</th>
              <th>Nombre</th>
              <th>Grado</th>
              <th>Grupo</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {alumnosFiltrados.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">No hay alumnos registrados</td>
              </tr>
            ) : (
              alumnosFiltrados.map(al => (
                <tr key={al.id}>
                  <td>{al.matricula}</td>
                  <td>{al.nombre}</td>
                  <td>{al.grado}</td>
                  <td>{al.grupo}</td>

                  <td className="inv-actions">


                    <button className="act" onClick={() => abrirVer(al)}>
                      <Eye size={18} />
                    </button>

                    <button className="act act-edit" onClick={() => abrirEditar(al)}>
                      <Pencil size={18} />
                    </button>

                    <button className="act act-del" onClick={() => abrirEliminar(al)}>
                      <Trash2 size={18} />
                    </button>

                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>


      {modalTipo === "ver" && alumnoSeleccionado && (
        <ModalReutilizable
          tipo="ver"
          titulo={alumnoSeleccionado.nombre}
          datos={{
            Matrícula: alumnoSeleccionado.matricula,
            Nombre: alumnoSeleccionado.name,
            "Apellido": alumnoSeleccionado.lastName,
            Edad: alumnoSeleccionado.age,
            Grado: alumnoSeleccionado.grado,
            Grupo: alumnoSeleccionado.grupo,
          }}
          onClose={cerrarModal}
        />
      )}

      {modalTipo === "agregar" && alumnoSeleccionado && (
        <ModalReutilizable
          tipo="agregar"
          titulo="Agregar Alumno"
          onClose={cerrarModal}
          onSubmit={handleAgregar}
        >
          <label>Nombre</label>
          <input
            value={alumnoSeleccionado.name}
            onChange={(e) =>
              setAlumnoSeleccionado({
                ...alumnoSeleccionado,
                name: e.target.value,
              })
            }
          />

          <label>Apellido</label>
          <input
            value={alumnoSeleccionado.lastName}
            onChange={(e) =>
              setAlumnoSeleccionado({
                ...alumnoSeleccionado,
                lastName: e.target.value,
              })
            }
          />

          <label>Matrícula</label>
          <input
            value={alumnoSeleccionado.matricula}
            onChange={(e) =>
              setAlumnoSeleccionado({
                ...alumnoSeleccionado,
                matricula: e.target.value,
              })
            }
          />

          <label>Edad</label>
          <input
            type="number"
            value={alumnoSeleccionado.age}
            onChange={(e) =>
              setAlumnoSeleccionado({
                ...alumnoSeleccionado,
                age: e.target.value,
              })
            }
          />

          <label>Grado</label>
          <input
            value={alumnoSeleccionado.grado}
            onChange={(e) =>
              setAlumnoSeleccionado({
                ...alumnoSeleccionado,
                grado: e.target.value,
              })
            }
          />

          <label>Grupo</label>
          <input
            value={alumnoSeleccionado.grupo}
            onChange={(e) =>
              setAlumnoSeleccionado({
                ...alumnoSeleccionado,
                grupo: e.target.value,
              })
            }
          />
        </ModalReutilizable>
      )}

      {modalTipo === "editar" && alumnoSeleccionado && (
        <ModalReutilizable
          tipo="editar"
          titulo="Editar Alumno"
          onClose={cerrarModal}
          onSubmit={handleEditar}
        >
          <label>Nombre</label>
          <input
            value={alumnoSeleccionado.name}
            onChange={(e) =>
              setAlumnoSeleccionado({ ...alumnoSeleccionado, name: e.target.value })
            }
          />

          <label>Apellido</label>
          <input
            value={alumnoSeleccionado.lastName}
            onChange={(e) =>
              setAlumnoSeleccionado({ ...alumnoSeleccionado, lastName: e.target.value })
            }
          />

          <label>Edad</label>
          <input
            type="number"
            value={alumnoSeleccionado.age}
            onChange={(e) =>
              setAlumnoSeleccionado({ ...alumnoSeleccionado, age: e.target.value })
            }
          />

          <label>Grado</label>
          <input
            value={alumnoSeleccionado.grado}
            onChange={(e) =>
              setAlumnoSeleccionado({ ...alumnoSeleccionado, grado: e.target.value })
            }
          />

          <label>Grupo</label>
          <input
            value={alumnoSeleccionado.grupo}
            onChange={(e) =>
              setAlumnoSeleccionado({ ...alumnoSeleccionado, grupo: e.target.value })
            }
          />
        </ModalReutilizable>
      )}

      {modalTipo === "eliminar" && alumnoSeleccionado && (
        <ModalReutilizable
          tipo="eliminar"
          titulo="Eliminar Alumno"
          nombreElemento={alumnoSeleccionado.nombre}
          onClose={cerrarModal}
          onSubmit={handleEliminar}
        />
      )}
    </div>
  );
}
