import React from 'react';
import { LayoutDashboard, Package, BookOpen, Settings, LogOut, GraduationCap } from 'lucide-react';
import './Sidebar.css';

export const Sidebar = ({ currentView, setView, onLogout }) => {
  const navClass = (view) =>
    `sidebar-item ${currentView === view ? 'active' : ''}`;

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-logo">TS</div>
        <h1>Telesecundaria</h1>
        <p>No. 531</p>
      </div>

      <nav className="sidebar-nav">
        <div onClick={() => setView('dashboard')} className={navClass('dashboard')}>
          <LayoutDashboard size={20} />
          <span>Inicio</span>
        </div>
        <div onClick={() => setView('inventory')} className={navClass('inventory')}>
          <Package size={20} />
          <span>Inventario</span>
        </div>
        <div onClick={() => setView('library')} className={navClass('library')}>
          <BookOpen size={20} />
          <span>Biblioteca</span>
        </div>
        <div onClick={() => setView('students')} className={navClass('students')}>
          <GraduationCap size={20} />
          <span>Alumnos</span>
        </div>

        <div className="sidebar-divider"></div>

        <div onClick={() => setView('settings')} className={navClass('settings')}>
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
