import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalReutilizable from "../components/ModalReutilizable";
import { Eye, Pencil, Trash2, PlusCircle, Bell, Package, Search } from "lucide-react";
import "../components/Inventory.css";
import "../components/Biblioteca.css";

export const Inventory = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("Todas");

  const [modalType, setModalType] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const [newItem, setNewItem] = useState({
    name: "",
    categoryId: "",
    quantity: 1,
    status: "",
  });

  const loadItems = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/inventory/get");
      const mapped = res.data.map((i) => ({
        id: i.id,
        name: i.item_name || "Sin nombre",
        category:
          i.category?.name ||
          i.category ||
          (i.category_id ? `Categoría #${i.category_id}` : "Sin categoría"),
        categoryId: i.category?.id || i.category_id || null,
        status: i.estado || "Desconocido",
        quantity: i.quantity ?? 0,
        location: i.location || "Sin ubicación",
        lastUpdate: i.updatedAt?.slice(0, 10) || "N/A",
        serial: i.serial || "N/A",
        description: i.description || "Sin descripción",
      }));
      setItems(mapped);
    } catch (error) {
      console.error("Error cargando items:", error);
    }
  };

  const loadCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/categories/get");
      setCategories(res.data.map((c) => ({ id: c.id, name: c.name })));
    } catch (err) {
      console.error("Error cargando categorías:", err);
    }
  };

  useEffect(() => {
    loadItems();
    loadCategories();
  }, []);

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "Todas" || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const openView = (item) => {
    setSelectedItem(item);
    setModalType("ver");
  };

  const openEdit = (item) => {
    setSelectedItem({ ...item });
    setModalType("editar");
  };

  const openDelete = (item) => {
    setSelectedItem(item);
    setModalType("eliminar");
  };

  const openAdd = () => {
    setNewItem({
      name: "",
      categoryId: "",
      quantity: 1,
      status: "",
    });
    setModalType("agregar");
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedItem(null);
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        item_name: selectedItem.name,
        quantity: Number(selectedItem.quantity),
        estado: selectedItem.status,
        category_id: selectedItem.categoryId,
      };

      await axios.put(`http://localhost:3000/api/inventory/${selectedItem.id}`, payload);
      await loadItems();
      closeModal();
    } catch (error) {
      console.error("Error guardando edición:", error);
    }
  };

  const saveNew = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        item_name: newItem.name,
        quantity: Number(newItem.quantity),
        estado: newItem.status,
        category_id: newItem.categoryId,
      };

      await axios.post("http://localhost:3000/api/inventory/add", payload);
      await loadItems();
      closeModal();
    } catch (err) {
      console.error("Error agregando item:", err);
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/inventory/${selectedItem.id}`);
      await loadItems();
      closeModal();
    } catch (error) {
      console.error("Error eliminando item:", error);
    }
  };

  return (
    <div className="inventory-container">

      <div className="inv-header">
        <div>
          <h2 className="inv-title">
            <Package size={28} style={{ marginRight: "6px" }} />
            Inventario General
          </h2>

          <p className="inv-subtitle">Gestión de bienes materiales y suministros.</p>
        </div>
      </div>

      <div className="inv-controls">

        <div className="inv-search-box">
          <input
            className="inv-search"
            type="text"
            placeholder="Buscar artículo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="inv-select"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="Todas">Todas las Categorías</option>
          {categories.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        <button className="inv-add-btn" onClick={openAdd}>
          <PlusCircle size={18} /> Agregar Nuevo
        </button>
      </div>

      <div className="inv-table-wrapper">
        <table className="inv-table">
          <thead>
            <tr>
              <th>NOMBRE</th>
              <th>CATEGORÍA</th>
              <th>ESTADO</th>
              <th>CANTIDAD</th>
              <th>ACCIONES</th>
            </tr>
          </thead>

          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td>
                  {item.quantity < 5 && <Bell color="red" size={16} style={{ marginRight: "6px" }} />}
                  {item.name}
                </td>

                <td>
                  <span className="inv-badge">{item.category}</span>
                </td>

                <td>{item.status}</td>
                <td>{item.quantity}</td>

                <td className="inv-actions">
                  <button className="act-view" onClick={() => openView(item)}>
                    <Eye size={18} />
                  </button>
                  <button className="act-edit" onClick={() => openEdit(item)}>
                    <Pencil size={18} />
                  </button>
                  <button className="act-del" onClick={() => openDelete(item)}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}

            {filteredItems.length === 0 && (
              <tr>
                <td colSpan="5" className="no-data">
                  No se encontraron elementos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalType === "ver" && selectedItem && (
        <ModalReutilizable
          tipo="ver"
          titulo={selectedItem.name}
          onClose={closeModal}
          datos={{
            Estado: selectedItem.status,
            Cantidad: selectedItem.quantity,
            Categoría: selectedItem.category,
            "Número de serie": selectedItem.serial,
            "Última actualización": selectedItem.lastUpdate,
            Descripción: selectedItem.description,
          }}
        />
      )}

      {modalType === "editar" && selectedItem && (
        <ModalReutilizable
          tipo="editar"
          titulo="Editar elemento"
          onClose={closeModal}
          onSubmit={saveEdit}
        >
          <>
            <label>Nombre del artículo</label>
            <input
              value={selectedItem.name}
              onChange={(e) =>
                setSelectedItem({ ...selectedItem, name: e.target.value })
              }
            />

            <label>Categoría</label>
            <select
              value={selectedItem.categoryId}
              onChange={(e) =>
                setSelectedItem({ ...selectedItem, categoryId: Number(e.target.value) })
              }
            >
              <option value="">Seleccione una categoría</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <label>Cantidad</label>
            <input
              type="number"
              value={selectedItem.quantity}
              onChange={(e) =>
                setSelectedItem({ ...selectedItem, quantity: Number(e.target.value) })
              }
            />

            <label>Estado</label>
            <select
              value={selectedItem.status}
              onChange={(e) =>
                setSelectedItem({ ...selectedItem, status: e.target.value })
              }
            >
              <option value="">Seleccione</option>
              <option value="nuevo">nuevo</option>
              <option value="buen estado">buen estado</option>
              <option value="mal estado">mal estado</option>
            </select>
          </>
        </ModalReutilizable>
      )}

      {modalType === "agregar" && (
        <ModalReutilizable
          tipo="agregar"
          titulo="Agregar nuevo artículo"
          onClose={closeModal}
          onSubmit={saveNew}
        >
          <>
            <label>Nombre</label>
            <input
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />

            <label>Categoría</label>
            <select
              value={newItem.categoryId}
              onChange={(e) =>
                setNewItem({ ...newItem, categoryId: Number(e.target.value) })
              }
            >
              <option value="">Seleccione una categoría</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <label>Cantidad</label>
            <input
              type="number"
              value={newItem.quantity}
              onChange={(e) =>
                setNewItem({ ...newItem, quantity: Number(e.target.value) })
              }
            />

            <label>Estado</label>
            <select
              value={newItem.status}
              onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}
            >
              <option value="">Seleccione</option>
              <option value="nuevo">nuevo</option>
              <option value="buen estado">buen estado</option>
              <option value="mal estado">mal estado</option>
            </select>
          </>
        </ModalReutilizable>
      )}

      {modalType === "eliminar" && selectedItem && (
        <ModalReutilizable
          tipo="eliminar"
          titulo="Eliminar"
          nombreElemento={selectedItem.name}
          onClose={closeModal}
          onSubmit={confirmDelete}
        />
      )}
    </div>
  );
};

export default Inventory;
