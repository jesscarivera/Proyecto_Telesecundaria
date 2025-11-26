import React, { useState } from "react";
import "../components/Inventory.css";

export const Inventory = ({
  items = [],
  categories = [],
  onAdd,
  onUpdate,
  onDelete,
  onGenerateReport
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("Todas");

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "Todas" || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="inventory-container">
      {/* HEADER */}
      <div className="inv-header">
        <div>
          <h2 className="inv-title">Inventario General</h2>
          <p className="inv-subtitle">Gestión de bienes materiales y suministros.</p>
        </div>

        <button className="btn-report" onClick={onGenerateReport}>
          📝 Generar Reporte
        </button>
      </div>

      {/* CONTROLES */}
      <div className="inv-controls">
        <div className="inv-search-box">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="inv-select"
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
        >
          <option value="Todas">Todas las Categorías</option>
          {categories.map(c => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        <button className="btn-add" onClick={onAdd}>
          ➕ Agregar Nuevo
        </button>
      </div>

      {/* TABLA */}
      <div className="inv-table-wrapper">
        <table className="inv-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NOMBRE</th>
              <th>CATEGORÍA</th>
              <th>ESTADO</th>
              <th>CANTIDAD</th>
              <th>ACCIONES</th>
            </tr>
          </thead>

          <tbody>
            {filteredItems.map(item => (
              <tr key={item.id}>
                <td>#{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <span className="badge">{item.category}</span>
                </td>
                <td>{item.status}</td>
                <td>{item.quantity}</td>
                <td className="inv-actions">
                  <button onClick={() => onUpdate(item)} className="act act-edit">
                    ✏️
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="act act-del"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}

            {filteredItems.length === 0 && (
              <tr>
                <td colSpan="6" className="no-data">
                  No se encontraron elementos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
