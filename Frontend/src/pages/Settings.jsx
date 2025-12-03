import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Outlet } from "react-router-dom"; 
import "../components/Settings.css";

export default function Settings() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/settings") {
      navigate("users", { replace: true });
    }
  }, [location, navigate]);

  return (
    <div className="settings-container">

      <div className="settings-header">
        <h1>Configuración del Sistema</h1>
      </div>

      <div className="settings-tabs">

        <button
          className="settings-tab"
          onClick={() => navigate("users")}
        >
          Gestión de Usuarios
        </button>

        <button
          className="settings-tab"
          onClick={() => navigate("categories")}
        >
          Categorías
        </button>

      </div>

      <div className="settings-content">
        <Outlet />
      </div>

    </div>
  );
}
