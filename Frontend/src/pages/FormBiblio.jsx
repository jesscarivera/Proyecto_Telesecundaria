import React from "react";
import "./FormGlobal.css";

const FormBiblio = () => {
  return (
    <form className="formulario">
      <h2>Registrar Libro</h2>

      <div className="campo">
        <label>Título</label>
        <input type="text" placeholder="Ej. Cien años de soledad" />
      </div>

      <div className="campo">
        <label>Autor</label>
        <input type="text" placeholder="Ej. Gabriel García Márquez" />
      </div>

      <div className="campo-doble">
        <div>
          <label>Categoría</label>
          <select>
            <option>Seleccionar...</option>
            <option>Novela</option>
            <option>Historia</option>
            <option>Literatura</option>
            <option>Ciencia</option>
            <option>Libro de Texto</option>
          </select>
        </div>

        <div>
          <label>Cantidad</label>
          <input type="number" min="1" placeholder="Ej. 5" />
        </div>
      </div>

      <button className="btn-guardar">Guardar</button>
    </form>
  );
};

export default FormBiblio;
