import React, { useState, useEffect } from "react";
import { Eye, Pencil, Trash2, PlusCircle, BookOpen } from "lucide-react";
import ModalReutilizable from "../components/ModalReutilizable";
import "../components/Biblioteca.css";

const Biblioteca = () => {
  const [libros, setLibros] = useState([]);
  const [librosFiltrados, setLibrosFiltrados] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const [modal, setModal] = useState(null);
  const [seleccion, setSeleccion] = useState(null);

  const [form, setForm] = useState({
    title: "",
    author: "",
    year_publication: "",
    genre: "",
    editorial: "",
    copies_availables: 1,
    copies_total: 1,
  });

  // Cargar libros

  const cargarLibros = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/library/get");
      const data = await res.json();
      setLibros(data);
      setLibrosFiltrados(data);
    } catch (e) {
      console.error("Error cargando libros:", e);
    }
  };

  useEffect(() => {
    cargarLibros();
  }, []);

  useEffect(() => {
    if (busqueda.trim() === "") {
      setLibrosFiltrados(libros);
    } else {
      setLibrosFiltrados(
        libros.filter(
          (l) =>
            l.title.toLowerCase().includes(busqueda.toLowerCase()) ||
            l.author.toLowerCase().includes(busqueda.toLowerCase()) ||
            l.genre.toLowerCase().includes(busqueda.toLowerCase())
        )
      );
    }
  }, [busqueda, libros]);

  const abrirModal = (tipo, libro = null) => {
    setModal(tipo);
    setSeleccion(libro);

    if (libro) {
      setForm({
        title: libro.title,
        author: libro.author,
        year_publication: libro.year_publication,
        genre: libro.genre,
        editorial: libro.editorial,
        copies_availables: libro.copies_availables,
        copies_total: libro.copies_total,
      });
    } else {
      setForm({
        title: "",
        author: "",
        year_publication: "",
        genre: "",
        editorial: "",
        copies_availables: 1,
        copies_total: 1,
      });
    }
  };

  const cerrarModal = () => {
    setModal(null);
    setSeleccion(null);
  };

  const agregarLibro = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:3000/api/library/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      cargarLibros();
      cerrarModal();
    } catch (e) {
      console.error("Error agregando:", e);
    }
  };

  const editarLibro = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:3000/api/library/edit/${seleccion.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      cargarLibros();
      cerrarModal();
    } catch (e) {
      console.error("Error editando:", e);
    }
  };

  const eliminarLibro = async () => {
    try {
      await fetch(`http://localhost:3000/api/library/delete/${seleccion.id}`, {
        method: "DELETE",
      });
      cargarLibros();
      cerrarModal();
    } catch (e) {
      console.error("Error eliminando:", e);
    }
  };

  return (
    <div className="biblio-container">
      
      <div className="inv-header">
        <div>
          <h1 className="inv-title">
            <BookOpen size={32} style={{ marginRight: "10px", verticalAlign: "middle" }} />
            Biblioteca Escolar
          </h1>
          <p className="inv-subtitle">Gestión de acervo bibliográfico y préstamos.</p>
        </div>
      </div>

      <div className="search-add-container">
        <input
          type="text"
          placeholder="Buscar por título, autor o género..."
          className="search-input"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <button className="btn-agregar-libro" onClick={() => abrirModal("agregar")}>
          <PlusCircle size={20} /> Agregar Libro
        </button>
      </div>

      <div className="inv-table-wrapper">
        <table className="inv-table">
          <thead>
            <tr>
              <th style={{ display: "none" }}>ID</th>
              <th>Título</th>
              <th>Género</th>
              <th>Autor</th>
              <th>Editorial</th>
              <th>Año</th>
              <th>Copias Disp.</th>
              <th>Copias Totales</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {librosFiltrados.length === 0 ? (
              <tr>
                <td colSpan="8" className="no-data">
                  No hay libros registrados.
                </td>
              </tr>
            ) : (
              librosFiltrados.map((libro) => (
                <tr key={libro.id}>
                  <td style={{ display: "none" }}>{libro.id}</td>
                  <td>{libro.title}</td>
                  <td>{libro.genre}</td>
                  <td>{libro.author}</td>
                  <td>{libro.editorial}</td>
                  <td>{libro.year_publication}</td>
                  <td>{libro.copies_availables}</td>
                  <td>{libro.copies_total}</td>

                  <td className="inv-actions">
                    <button className="act act-view" onClick={() => abrirModal("ver", libro)}>
                      <Eye size={18} />
                    </button>
                    <button className="act act-edit" onClick={() => abrirModal("editar", libro)}>
                      <Pencil size={18} />
                    </button>
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


      {modal === "ver" && seleccion && (
        <ModalReutilizable
          tipo="ver"
          titulo={seleccion.title}
          onClose={cerrarModal}
          datos={{
            "Título": seleccion.title,
            "Autor": seleccion.author,
            "Año publicación": seleccion.year_publication,
            "Género": seleccion.genre,
            "Editorial": seleccion.editorial,
            "Copias disponibles": seleccion.copies_availables,
            "Copias totales": seleccion.copies_total,
          }}
        />
      )}

      {modal === "editar" && seleccion && (
        <ModalReutilizable
          tipo="editar"
          titulo="Editar libro"
          onClose={cerrarModal}
          onSubmit={editarLibro}
        >
          <>
            <label>Título</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />

            <label>Autor</label>
            <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />

            <label>Año publicación</label>
            <input
              type="number"
              value={form.year_publication}
              onChange={(e) => setForm({ ...form, year_publication: e.target.value })}
            />

            <label>Género</label>
            <input value={form.genre} onChange={(e) => setForm({ ...form, genre: e.target.value })} />

            <label>Editorial</label>
            <input value={form.editorial} onChange={(e) => setForm({ ...form, editorial: e.target.value })} />

            <label>Copias disponibles</label>
            <input
              type="number"
              value={form.copies_availables}
              onChange={(e) => setForm({ ...form, copies_availables: e.target.value })}
            />

            <label>Copias totales</label>
            <input
              type="number"
              value={form.copies_total}
              onChange={(e) => setForm({ ...form, copies_total: e.target.value })}
            />
          </>
        </ModalReutilizable>
      )}

      {modal === "eliminar" && seleccion && (
        <ModalReutilizable
          tipo="eliminar"
          titulo="Eliminar libro"
          onClose={cerrarModal}
          onSubmit={eliminarLibro}
          nombreElemento={seleccion.title}
        />
      )}

      {modal === "agregar" && (
        <ModalReutilizable
          tipo="agregar"
          titulo="Agregar libro"
          onClose={cerrarModal}
          onSubmit={agregarLibro}
        >
          <>
            <label>Título</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />

            <label>Autor</label>
            <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />

            <label>Año publicación</label>
            <input
              type="number"
              value={form.year_publication}
              onChange={(e) => setForm({ ...form, year_publication: e.target.value })}
            />

            <label>Género</label>
            <input value={form.genre} onChange={(e) => setForm({ ...form, genre: e.target.value })} />

            <label>Editorial</label>
            <input value={form.editorial} onChange={(e) => setForm({ ...form, editorial: e.target.value })} />

            <label>Copias disponibles</label>
            <input
              type="number"
              value={form.copies_availables}
              onChange={(e) => setForm({ ...form, copies_availables: e.target.value })}
            />

            <label>Copias totales</label>
            <input
              type="number"
              value={form.copies_total}
              onChange={(e) => setForm({ ...form, copies_total: e.target.value })}
            />
          </>
        </ModalReutilizable>
      )}
    </div>
  );
};

export default Biblioteca;
