import React, { useState } from "react";
import "./Inventario.css";
import { createItem } from "../api/inventoryApi";

const AddItemModal = ({ open, onClose, onSaved }) => {
  const [formData, setFormData] = useState({
    item_name: "",
    description: "",
    quantity: "",
    unit: "",
    location: "",
    category_id: "",
    estado: "nuevo"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createItem(formData);
    onSaved();
    onClose();
  };

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Agregar Nuevo Elemento</h2>

        <form onSubmit={handleSubmit} className="modal-form">
          <input name="item_name" placeholder="Nombre" onChange={handleChange} />
          <input name="description" placeholder="Descripción" onChange={handleChange} />
          <input name="quantity" type="number" placeholder="Cantidad" onChange={handleChange} />
          <input name="unit" placeholder="Unidad (pz, caja, etc.)" onChange={handleChange} />
          <input name="location" placeholder="Ubicación" onChange={handleChange} />
          <input name="category_id" placeholder="ID Categoría" onChange={handleChange} />

          <button type="submit" className="btn-add">Guardar</button>
          <button type="button" onClick={onClose} className="btn-cancel">Cancelar</button>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;
