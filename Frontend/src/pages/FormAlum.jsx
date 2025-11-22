import React from "react";
import "./FormGlobal.css";

const FormAlum = () => {
  return (
    <form className="formulario">
      <h2>Registrar Alumno</h2>

      <div className="campo">
        <label>Nombre Completo</label>
        <input type="text" placeholder="Ej. Ana Sofía Castro García" />
      </div>

      <div className="campo-doble">
        <div>
          <label>Grado</label>
          <select>
            <option>Seleccionar...</option>
            <option>1°</option>
            <option>2°</option>
            <option>3°</option>
          </select>
        </div>

        <div>
          <label>Grupo</label>
          <select>
            <option>Seleccionar...</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>
        </div>
      </div>

      <div className="campo">
        <label>Estatus</label>
        <select>
          <option>Seleccionar...</option>
          <option>Activo</option>
          <option>Suspendido</option>
          <option>Dado de Baja</option>
        </select>
      </div>

      <button className="btn-guardar">Guardar</button>
    </form>
  );
};

export default FormAlum;
