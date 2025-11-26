import React, { useState } from "react";
import { Search, Eye, Pencil, Trash2, PlusCircle, XCircle, BookOpen } from "lucide-react";
import "../components/Biblioteca.css";

const Biblioteca = () => {
  // lista de libros (sin datos quemados)
  const [libros, setLibros] = useState([]);

  // tipo de modal abierto
  const [modal, setModal] = useState(null); // ver | editar | eliminar | agregar

  // libro seleccionado para ver/editar/eliminar
  const [seleccion, setSeleccion] = useState(null);

  // abre cualquier modal y guarda el libro seleccionado
  const abrirModal = (tipo, libro = null) => {
    setSeleccion(libro);
    setModal(tipo);
  };

  // cierra el modal y limpia selección
  const cerrarModal = () => {
    setSeleccion(null);
    setModal(null);
  };

  // elimina un libro
  const eliminarLibro = () => {
    setLibros(libros.filter((l) => l.id !== seleccion.id));
    cerrarModal();
  };

  // totales para los recuadros
  const totalLibros = libros.length;
  const prestados = libros.filter((l) => l.cantidad === 0).length;

  return (
    <div className="inventory-container">

      {/* ===== HEADER PRINCIPAL ===== */}
      <div className="inv-header">
        <div>
          <h1 className="inv-title">
            {/* icono tipo biblioteca */}
            <BookOpen size={32} style={{ marginRight: "10px", verticalAlign: "middle" }} />
            Biblioteca Escolar
          </h1>
          <p className="inv-subtitle">Gestión de acervo bibliográfico y préstamos.</p>
        </div>

        {/* recuadros de totales */}
        <div className="inv-summary-boxes">
          <div className="inv-summary-card">
            <div className="inv-summary-title">TOTAL LIBROS</div>
            <div className="inv-summary-value">{totalLibros}</div>
          </div>

          <div className="inv-summary-card">
            <div className="inv-summary-title">PRESTADOS</div>
            <div className="inv-summary-value">{prestados}</div>
          </div>
        </div>
      </div>

      {/* ===== CONTROLES SUPERIORES ===== */}
      <div className="inv-controls">
        {/* buscador */}
        <div className="inv-search-box">
          <Search className="icono" size={18} style={{ position: "absolute", margin: "12px" }} />
          <input type="text" placeholder="Buscar..." style={{ paddingLeft: "40px" }} />
        </div>

        {/* select de categoría */}
        <select className="inv-select">
          <option value="">Categoría...</option>
          <option value="Novela">Novela</option>
          <option value="Historia">Historia</option>
          <option value="Ciencia">Ciencia</option>
          <option value="Literatura">Literatura</option>
          <option value="Libro de Texto">Libro de Texto</option>
        </select>

        {/* botón agregar */}
        <button className="btn-add" onClick={() => abrirModal("agregar")}>
          <PlusCircle size={18} /> Agregar Nuevo Libro
        </button>
      </div>

      {/* ===== TABLA ===== */}
      <div className="inv-table-wrapper">
        <table className="inv-table">
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
            {/* si no hay libros, mostrar mensaje */}
            {libros.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">
                  No hay libros registrados.
                </td>
              </tr>
            ) : (
              // recorrer libros y mostrarlos
              libros.map((libro) => (
                <tr key={libro.id}>
                  <td>{libro.id}</td>
                  <td>{libro.titulo}</td>
                  <td>{libro.categoria}</td>
                  <td>{libro.autor}</td>
                  <td>{libro.cantidad}</td>
                  <td className="inv-actions">
                    {/* botón ver */}
                    <button className="act act-view" onClick={() => abrirModal("ver", libro)}>
                      <Eye size={18} />
                    </button>
                    {/* botón editar */}
                    <button className="act act-edit" onClick={() => abrirModal("editar", libro)}>
                      <Pencil size={18} />
                    </button>
                    {/* botón eliminar */}
                    <button className="act act-del" onClick={() => abrirModal("eliminar", libro)}>
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ===== MODALES ===== */}

      {/* modal ver detalles */}
      {modal === "ver" && seleccion && (
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

      {/* modal editar */}
      {modal === "editar" && seleccion && (
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

      {/* modal eliminar */}
      {modal === "eliminar" && seleccion && (
        <div className="modal-fondo">
          <div className="modal-contenido modal-eliminar">
            {/* icono eliminar */}
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

      {/* modal agregar */}
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
