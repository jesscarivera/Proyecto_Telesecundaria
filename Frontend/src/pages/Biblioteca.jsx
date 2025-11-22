import React from "react";
import { Search, Eye, Pencil, Trash2, PlusCircle } from "lucide-react";
import "../components/Biblioteca.css";

const Biblioteca = () => {
  const libros = [
    { id: 1, titulo: "Cien años de soledad", categoria: "Novela", autor: "Gabriel García Márquez", cantidad: 3 },
    { id: 2, titulo: "Historia de México", categoria: "Historia", autor: "Varios", cantidad: 10 },
    { id: 3, titulo: "Álgebra y Geometría", categoria: "Libro de Texto", autor: "SEP", cantidad: 5 },
    { id: 4, titulo: "El Principito", categoria: "Literatura", autor: "A. de St-Exupery", cantidad: 3 },
    { id: 5, titulo: "Experimentos Químicos", categoria: "Ciencia", autor: "Dr. Eduardo Pérez", cantidad: 7 },
  ];

  return (
    <div className="contenedor-biblioteca">
      <h2>Biblioteca</h2>

      <div className="busqueda-filtros">
        <div className="barra-busqueda">
          <Search className="icono" size={18} />
          <input type="text" placeholder="Buscar..." />
        </div>
        <button className="btn-buscar">Buscar</button>

        <div className="filtro-categoria">
          <label>Filtrar</label>
          <select>
            <option>Categoría...</option>
            <option>Novela</option>
            <option>Historia</option>
            <option>Ciencia</option>
            <option>Literatura</option>
            <option>Libro de Texto</option>
          </select>
        </div>

        <button className="btn-agregar">
          <PlusCircle size={18} /> Agregar Nuevo Libro
        </button>
      </div>

      <table className="tabla-biblioteca">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Categoría</th>
            <th>Autor</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {libros.map((libro) => (
            <tr key={libro.id}>
              <td>{libro.id}</td>
              <td>{libro.titulo}</td>
              <td>{libro.categoria}</td>
              <td>{libro.autor}</td>
              <td>{libro.cantidad}</td>
              <td className="acciones">
                <Eye size={18} className="ver" title="Ver" />
                <Pencil size={18} className="editar" title="Editar" />
                <Trash2 size={18} className="eliminar" title="Eliminar" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Biblioteca;
