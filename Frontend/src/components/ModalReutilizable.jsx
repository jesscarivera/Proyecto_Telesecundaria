import React from "react";
import { X, AlertTriangle } from "lucide-react";
import "./ModalReutilizable.css";
const ModalReutilizable = ({ tipo, titulo, onClose, onSubmit, children, datos, nombreElemento, }) => {
  
  return (
    <div className="mr-overlay">
      <div className="mr-modal">

        <div className="mr-header">
          <h2>{titulo}</h2>
          <button className="mr-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="mr-body">

          {tipo === "ver" && datos && (
            <div className="mr-view">
              {Object.entries(datos).map(([key, value]) => (
                <p key={key}>
                  <strong className="mr-label">{key}:</strong> {value}
                </p>
              ))}
            </div>
          )}

          {(tipo === "editar" || tipo === "agregar") && (
            <form className="mr-form" onSubmit={(e) => onSubmit(e)}>
              {children}
              <div className="mr-actions">
                <button type="button" className="mr-btn-cancel" onClick={onClose}>
                  Cancelar
                </button>

                <button type="submit" className="mr-btn-submit">
                  {tipo === "editar" ? "Guardar" : "Agregar"}
                </button>
              </div>
            </form>
          )}

          {tipo === "eliminar" && (
            <div className="mr-delete">
              <AlertTriangle size={60} className="mr-icon-warning" />

              <h3>¿Eliminar elemento?</h3>

              <p>
                ¿Estás seguro de que deseas eliminar{" "}
                <strong>{nombreElemento}</strong>?
                <br />
                Esta acción no se puede deshacer.
              </p>

              <div className="mr-actions">
                <button className="mr-btn-cancel" onClick={onClose}>
                  Cancelar
                </button>
                <button className="mr-btn-delete" onClick={onSubmit}>
                  Sí, eliminar
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default ModalReutilizable;
