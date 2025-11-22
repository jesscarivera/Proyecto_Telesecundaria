import React from "react";
import { Search, Eye, Pencil, Trash2, PlusCircle } from "lucide-react";
import "../components/Alumnos.css";

const Alumnos = () => {
  const alumnos = [
    { id: 1, nombre: "Ana Sofía Castro García", grado: "1°", grupo: "A", estatus: "Activo" },
    { id: 2, nombre: "Ricardo Gómez Fuentes", grado: "2°", grupo: "B", estatus: "Activo" },
    { id: 3, nombre: "Luis Armando Pérez Soto", grado: "3°", grupo: "A", estatus: "Suspendido" },
    { id: 4, nombre: "Karla Daniela Ramos Vera", grado: "1°", grupo: "B", estatus: "Dado de Baja" },
    { id: 5, nombre: "Javier Torres Vera", grado: "2°", grupo: "A", estatus: "Activo" }
  ];

  return (
    <div className="contenedor-alumnos">
      <h2>Alumnos</h2>

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
                <Pencil className="editar" size={18} title="Modificar" />
                <Eye className="ver" size={18} title="Ver detalles" />
                <Trash2 className="eliminar" size={18} title="Eliminar" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Alumnos;
