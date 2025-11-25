import React, { useState } from 'react';
import { Sidebar } from '../components/Sidedar';

export const MainLayout = ({ children, onLogout }) => {
  const [currentView, setCurrentView] = useState('dashboard'); // vista actual
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);   // sidebar abierto o cerrado

  return (
    <div className="flex">
      {/* sidebar */}
      <Sidebar
        currentView={currentView}
        setView={setCurrentView}
        isOpen={isSidebarOpen}
        onLogout={onLogout}
      />

      {/* contenido principal */}
      <main className="flex-1 ml-64 p-6">
        {children}
      </main>
    </div>
  );
};
