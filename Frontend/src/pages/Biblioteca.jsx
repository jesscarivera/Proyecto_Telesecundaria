import React, { useState } from "react";
import { Search, Eye, Pencil, Trash2, PlusCircle, XCircle } from "lucide-react";
import "../components/Biblioteca.css";

const Biblioteca = () => {
  const [libros, setLibros] = useState([
    { id: 1, titulo: "Cien años de soledad", categoria: "Novela", autor: "Gabriel García Márquez", cantidad: 3 },
    { id: 2, titulo: "Historia de México", categoria: "Historia", autor: "Varios", cantidad: 10 },
    { id: 3, titulo: "Álgebra y Geometría", categoria: "Libro de Texto", autor: "SEP", cantidad: 5 },
    { id: 4, titulo: "El Principito", categoria: "Literatura", autor: "A. de St-Exupery", cantidad: 3 },
    { id: 5, titulo: "Experimentos Químicos", categoria: "Ciencia", autor: "Dr. Eduardo Pérez", cantidad: 7 },
  ]);

  // ---------- ESTADOS PARA MODALES ----------
  const [modal, setModal] = useState(null); // ver | editar | eliminar | agregar
  const [seleccion, setSeleccion] = useState(null);

  const abrirModal = (tipo, libro = null) => {
    setSeleccion(libro);
    setModal(tipo);
  };

  const cerrarModal = () => {
    setSeleccion(null);
    setModal(null);
  };

  // ---------- ACCIÓN ELIMINAR ----------
  const eliminarLibro = () => {
    setLibros(libros.filter((l) => l.id !== seleccion.id));
    cerrarModal();
  };

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

        <button className="btn-agregar" onClick={() => abrirModal("agregar")}>
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
                <Eye className="ver" size={18} onClick={() => abrirModal("ver", libro)} title="Ver" />
                <Pencil className="editar" size={18} onClick={() => abrirModal("editar", libro)} title="Editar" />
                <Trash2 className="eliminar" size={18} onClick={() => abrirModal("eliminar", libro)} title="Eliminar" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ============ MODALES ============ */}

      {/* 🔍 MODAL VER */}
      {modal === "ver" && (
        <div className="modal-fondo">
          <div className="modal-contenido">
            <h3>📖 Detalles del Libro</h3>
            <p><strong>Título:</strong> {seleccion.titulo}</p>
            <p><strong>Categoría:</strong> {seleccion.categoria}</p>
            <p><strong>Autor:</strong> {seleccion.autor}</p>
            <p><strong>Cantidad:</strong> {seleccion.cantidad}</p>
            <button className="btn-cerrar" onClick={cerrarModal}>Cerrar</button>
          </div>
        </div>
      )}

      {/* ✏️ MODAL EDITAR */}
      {modal === "editar" && (
        <div className="modal-fondo">
          <div className="modal-contenido">
            <h3>✏️ Editar Libro</h3>
            <form className="form-modal">
              <input type="text" defaultValue={seleccion.titulo} />
              <input type="text" defaultValue={seleccion.autor} />
              <input type="number" defaultValue={seleccion.cantidad} />
              <button className="btn-guardar">Guardar Cambios</button>
            </form>
            <button className="btn-cerrar" onClick={cerrarModal}>Cancelar</button>
          </div>
        </div>
      )}

      {/* 🗑️ MODAL ELIMINAR */}
      {modal === "eliminar" && (
        <div className="modal-fondo">
          <div className="modal-contenido modal-eliminar">
            <XCircle size={60} className="icono-eliminar" />
            <h3>¿Eliminar libro?</h3>
            <p>Esta acción no se puede deshacer.</p>
            <div className="botones-eliminar">
              <button className="btn-cancelar" onClick={cerrarModal}>Cancelar</button>
              <button className="btn-confirmar" onClick={eliminarLibro}>Eliminar</button>
            </div>
          </div>
        </div>
      )}

      {/* ➕ MODAL AGREGAR */}
      {modal === "agregar" && (
        <div className="modal-fondo">
          <div className="modal-contenido">
            <h3>➕ Agregar Libro</h3>
            <form className="form-modal">
              <input type="text" placeholder="Título..." />
              <input type="text" placeholder="Autor..." />
              <input type="number" placeholder="Cantidad..." />
              <button className="btn-guardar">Agregar</button>
            </form>
            <button className="btn-cerrar" onClick={cerrarModal}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Biblioteca;
