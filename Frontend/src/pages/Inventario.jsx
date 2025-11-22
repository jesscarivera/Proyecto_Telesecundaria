import React, { useState } from "react";
import "../components/Inventario.css";
import { 
  Home, ClipboardList, Book, Users, Settings, LogOut, 
  Eye, Pencil, Trash2, PlusCircle, Search, X 
} from "lucide-react";

// === Sidebar Items ===
const sidebarItems = [
  { icon: Home, label: "Inicio", active: false },
  { icon: ClipboardList, label: "Inventario", active: true },
  { icon: Book, label: "Biblioteca", active: false },
  { icon: Users, label: "Alumnos", active: false },
];

const bottomSidebarItems = [
  { icon: Settings, label: "Configuración" },
  { icon: LogOut, label: "Salir" },
];

// === Tabla Inventario ===
const inventoryItems = [
  { id: 1, name: "Proyector EPSON", category: "Electrónicos", status: "Buen Estado", quantity: 3 },
  { id: 2, name: "Computadoras", category: "Electrónicos", status: "Buen Estado", quantity: 20 },
  { id: 3, name: "Balón Futbol", category: "Deporte", status: "Nuevo", quantity: 5 },
  { id: 4, name: "Hojas de Máquina", category: "Papelería", status: "Nuevo", quantity: 100 },
  { id: 5, name: "Jabón Líquido", category: "Limpieza", status: "Nuevo", quantity: 10 },
];

// === Sidebar Component ===
const Sidebar = () => (
  <div className="sidebar">
    <div className="sidebar-logo">
      <img src="https://placehold.co/100x60" alt="Logo" />
    </div>

    <nav className="sidebar-menu">
      {sidebarItems.map((item) => (
        <a key={item.label} className={`sidebar-item ${item.active ? "active" : ""}`}>
          <item.icon size={18} className="icon" /> {item.label}
        </a>
      ))}
    </nav>

    <nav className="sidebar-bottom">
      {bottomSidebarItems.map((item) => (
        <a key={item.label} className="sidebar-item">
          <item.icon size={18} className="icon" /> {item.label}
        </a>
      ))}
    </nav>
  </div>
);

// === Inventario Principal ===
const Inventory = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState(null);

  const openModal = (type, item) => {
    setModalType(type);
    setSelectedItem(item);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedItem(null);
  };

  return (
    <div className="app-container">
      <Sidebar />

      <main className="main-content">

        {/* === Encabezado Logos === */}
        <header className="dashboard-header">
          <img src="/dgogob.png" alt="Gobierno de Durango" className="header-logo" />
          <img src="/setelLog.png" alt="SETEL Durango" className="header-logo" />
        </header>

        {/* === Título === */}
        <header className="title-header">
          <h1>Telesecundaria No. 531</h1>
        </header>

        {/* === Inventario Section === */}
        <section className="inventory-section">
          <div className="inv-header">
            <h2>Inventario</h2>
          </div>

          {/* === Busqueda === */}
          <div className="inv-actions">
            <div className="search-box">
              <Search size={18} className="icon" />
              <input type="text" placeholder="Buscar..." />
            </div>
            <button className="btn-search">Buscar</button>
          </div>

          {/* === Filtro y botón === */}
          <div className="inv-filter">
            <span>Filtrar</span>
            <select>
              <option>Categoría...</option>
              <option>Electrónicos</option>
              <option>Papelería</option>
              <option>Deporte</option>
              <option>Limpieza</option>
            </select>

            <button className="btn-add">
              <PlusCircle size={18} />
              Agregar Nuevo Elemento
            </button>
          </div>

          {/* === Tabla === */}
          <table className="inv-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Estado</th>
                <th>Cantidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {inventoryItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.status}</td>
                  <td>{item.quantity}</td>
                  <td className="actions">
                    <Eye className="view" size={18} onClick={() => openModal("view", item)} />
                    <Pencil className="edit" size={18} onClick={() => openModal("edit", item)} />
                    <Trash2 className="delete" size={18} onClick={() => openModal("delete", item)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </section>
      </main>

      {/* ========== MODALES ========== */}
      {modalType && selectedItem && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <X size={20} />
            </button>

            {/* === Ver === */}
            {modalType === "view" && (
              <>
                <h3>📌 Detalles del Elemento</h3>
                <p><b>Nombre:</b> {selectedItem.name}</p>
                <p><b>Categoría:</b> {selectedItem.category}</p>
                <p><b>Estado:</b> {selectedItem.status}</p>
                <p><b>Cantidad:</b> {selectedItem.quantity}</p>
              </>
            )}

            {/* === Editar === */}
            {modalType === "edit" && (
              <>
                <h3>✏️ Editar Elemento</h3>
                <form className="modal-form">
                  <label>Nombre</label>
                  <input type="text" defaultValue={selectedItem.name} />
                  <label>Categoría</label>
                  <input type="text" defaultValue={selectedItem.category} />
                  <label>Estado</label>
                  <input type="text" defaultValue={selectedItem.status} />
                  <label>Cantidad</label>
                  <input type="number" defaultValue={selectedItem.quantity} />
                  <button className="btn-save">Guardar Cambios</button>
                </form>
              </>
            )}

            {/* === Eliminar === */}
            {modalType === "delete" && (
              <>
                <h3>⚠️ ¿Eliminar?</h3>
                <p>¿Deseas eliminar <b>{selectedItem.name}</b> del inventario?</p>
                <button className="btn-delete-confirm">Sí, eliminar</button>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default Inventory;
