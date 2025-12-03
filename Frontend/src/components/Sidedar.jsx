import React from 'react';
import { LayoutDashboard, Package, BookOpen, Settings, LogOut, GraduationCap, ClipboardList } from 'lucide-react';
import './Sidebar.css';
import { useNavigate } from "react-router-dom";

export const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();

  const navClass = (view) => `sidebar-item`;

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-logo">TS</div>
        <h1>Telesecundaria</h1>
        <p>No. 531</p>
      </div>

      <nav className="sidebar-nav">

        {/* Dashboard */}
        <div
          onClick={() => navigate('/dashboard')}
          className={navClass('dashboard')}
        >
          <LayoutDashboard size={20} />
          <span>Inicio</span>
        </div>

        {/* Inventario */}
        <div
          onClick={() => navigate('/inventario')}
          className={navClass('inventory')}
        >
          <Package size={20} />
          <span>Inventario</span>
        </div>

        {/* Biblioteca */}
        <div
          onClick={() => navigate('/biblioteca')}
          className={navClass('library')}
        >
          <BookOpen size={20} />
          <span>Biblioteca</span>
        </div>

        {/* Alumnos */}
        <div
          onClick={() => navigate('/alumnos')}
          className={navClass('students')}
        >
          <GraduationCap size={20} />
          <span>Alumnos</span>
        </div>

        {/* Préstamos */}
        <div
          onClick={() => navigate('/prestamos')}
          className={navClass('prestamos')}
        >
          <ClipboardList size={20} />
          <span>Préstamos</span>
        </div>

        <div className="sidebar-divider"></div>

        {/* Configuración */}
        <div
          onClick={() => navigate('/settings')}
          className={navClass('settings')}
        >
          <Settings size={20} />
          <span>Configuración</span>
        </div>
      </nav>

      <div className="sidebar-logout">
        <button onClick={onLogout}>
          <LogOut size={20} /> Salir
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
