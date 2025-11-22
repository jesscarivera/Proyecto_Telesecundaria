import React from "react";
import "./FormGlobal.css";

const FormStock = () => {
  return (
    <form className="formulario">
      <h2>Registrar Producto</h2>

      <div className="campo">
        <label>Nombre</label>
        <input type="text" placeholder="Ej. Pantalla 50'' Samsung" />
      </div>

      <div className="campo">
        <label>Categoría</label>
        <select>
          <option>Seleccionar...</option>
          <option>Auriculares</option>
          <option>Pantallas</option>
          <option>Bocinas</option>
          <option>Computadoras</option>
          <option>Accesorios</option>
        </select>
      </div>

      <div className="campo-doble">
        <div>
          <label>Marca</label>
          <input type="text" placeholder="Ej. Sony / JBL / Samsung" />
        </div>

        <div>
          <label>Cantidad</label>
          <input type="number" min="1" placeholder="Ej. 10" />
        </div>
      </div>

      <button className="btn-guardar">Guardar</button>
    </form>
  );
};

export default FormStock;
