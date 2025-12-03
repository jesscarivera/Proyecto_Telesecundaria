import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import "./Category.css";

import ModalReutilizable from "../components/ModalReutilizable";

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState("TODOS");
  const [busqueda, setBusqueda] = useState("");

  const [nuevaCategoria, setNuevaCategoria] = useState("");
  const [nuevoTipo, setNuevoTipo] = useState("INVENTARIO");

  const [modalTipo, setModalTipo] = useState(null); 
  const [selected, setSelected] = useState(null);

  // Obtener todas las categorías
  const cargarCategorias = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/categories/get");
      const lista = res.data.map(c => ({
        id: c.id,
        name: c.name,
        type: c.type || "GENERAL"
      }));
      setCategorias(lista);
    } catch (err) {
      console.error("Error cargando categorías", err);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  // AGREGAR
  const agregarCategoria = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/categories/add", {
        name: nuevaCategoria,
        type: nuevoTipo
      });

      setModalTipo(null);
      setNuevaCategoria("");
      setNuevoTipo("INVENTARIO");
      cargarCategorias();
    } catch (err) {
      console.error("Error agregando categoría", err);
    }
  };

  // EDITAR
  const guardarEdicion = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3000/api/categories/${selected.id}`, {
        name: selected.name,
        type: selected.type
      });

      setModalTipo(null);
      cargarCategorias();
    } catch (err) {
      console.error("Error al editar", err);
    }
  };

  // ELIMINAR
  const eliminarCategoria = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/categories/${selected.id}`);
      setModalTipo(null);
      cargarCategorias();
    } catch (err) {
      console.error("Error eliminando", err);
    }
  };

  const categoriasFiltradas = categorias.filter(cat => {
    const coincideTipo = filtroTipo === "TODOS" || cat.type === filtroTipo;
    const coincideBusqueda = cat.name.toLowerCase().includes(busqueda.toLowerCase());
    return coincideTipo && coincideBusqueda;
  });

  return (
    <div className="category-container">

      <h3 className="category-title">Gestión de Categorías</h3>

      <div className="categorias-actions">
        <input
          type="text"
          className="category-search"
          placeholder="Buscar categoría..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <select
          className="category-select"
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
        >
          <option value="TODOS">Todos</option>
          <option value="INVENTARIO">Inventario</option>
          <option value="BIBLIOTECA">Biblioteca</option>
          <option value="GENERAL">General</option>
        </select>

        <button
          className="category-add-btn"
          onClick={() => setModalTipo("agregar")}
        >
          Agregar
        </button>
      </div>

      <div className="category-list">
        {categoriasFiltradas.length === 0 ? (
          <p className="no-data">No hay categorías para mostrar.</p>
        ) : (
          categoriasFiltradas.map((c) => (
            <div className="category-item" key={c.id}>

              <div className="category-info">
                <span className="category-name">{c.name}</span>
                <span className="category-type-tag">{c.type}</span>
              </div>

              <div className="category-actions">
                <button
                  className="icon-btn"
                  onClick={() => {
                    setSelected({ ...c });
                    setModalTipo("editar");
                  }}
                >
                  <Pencil size={18} strokeWidth={1.5} />
                </button>

                <button
                  className="icon-btn"
                  onClick={() => {
                    setSelected(c);
                    setModalTipo("eliminar");
                  }}
                >
                  <Trash2 size={18} strokeWidth={1.5} />
                </button>
              </div>

            </div>
          ))
        )}
      </div>

      {/* AGREGAR */}
      {modalTipo === "agregar" && (
        <ModalReutilizable
          tipo="agregar"
          titulo="Agregar Categoría"
          onClose={() => setModalTipo(null)}
          onSubmit={agregarCategoria}
        >
          <input
            type="text"
            className="mr-input"
            placeholder="Nombre..."
            value={nuevaCategoria}
            onChange={(e) => setNuevaCategoria(e.target.value)}
          />

          <select
            className="mr-input"
            value={nuevoTipo}
            onChange={(e) => setNuevoTipo(e.target.value)}
          >
            <option value="INVENTARIO">Inventario</option>
            <option value="BIBLIOTECA">Biblioteca</option>
            <option value="GENERAL">General</option>
          </select>
        </ModalReutilizable>
      )}

      {/* EDITAR */}
      {modalTipo === "editar" && selected && (
        <ModalReutilizable
          tipo="editar"
          titulo="Editar Categoría"
          onClose={() => setModalTipo(null)}
          onSubmit={guardarEdicion}
        >
          <input
            type="text"
            className="mr-input"
            value={selected.name}
            onChange={(e) =>
              setSelected({ ...selected, name: e.target.value })
            }
          />

          <select
            className="mr-input"
            value={selected.type}
            onChange={(e) =>
              setSelected({ ...selected, type: e.target.value })
            }
          >
            <option value="INVENTARIO">Inventario</option>
            <option value="BIBLIOTECA">Biblioteca</option>
            <option value="GENERAL">General</option>
          </select>
        </ModalReutilizable>
      )}

      {/* ELIMINAR */}
      {modalTipo === "eliminar" && selected && (
        <ModalReutilizable
          tipo="eliminar"
          titulo="Eliminar Categoría"
          nombreElemento={selected.name}
          onClose={() => setModalTipo(null)}
          onSubmit={eliminarCategoria}
        />
      )}
    </div>
  );
}
