import React, { useState } from "react";
import { Sidebar } from "../components/Sidedar";
import { SchoolHeader } from "../components/SchoolHeader";
import { Package, Book, AlertTriangle, CheckCircle } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import "../components/Dashboard.css";

// tarjeta de estadísticas
const StatCard = ({ title, value, icon: Icon, color, subtext }) => (
  <div className="stat-card">
    <div className="stat-info">
      <p className="stat-title">{title}</p>
      <h3 className="stat-value">{value}</h3>
      <p className="stat-subtext">{subtext}</p>
    </div>
    <div className={`stat-icon ${color}`}>
      <Icon size={28} />
    </div>
  </div>
);

export default function Dashboard({ inventory = [], library = [], notices = [], events = [] }) {
  const [view, setView] = useState("dashboard"); // pantalla actual

  // asegurar que los datos sean arrays
  const safeInventory = Array.isArray(inventory) ? inventory : [];
  const safeLibrary = Array.isArray(library) ? library : [];
  const safeNotices = Array.isArray(notices) ? notices : [];
  const safeEvents = Array.isArray(events) ? events : [];

  // cálculo de estadísticas
  const totalItems = safeInventory.reduce((acc, item) => acc + (item.quantity || 0), 0);
  const lowStock = safeInventory.filter(i => (i.quantity || 0) < 5).length;
  const totalBooks = safeLibrary.length;
  const borrowedBooks = safeLibrary.filter(b => !b.available).length;

  // datos para gráficas
  const categoryData = safeInventory.reduce((acc, item) => {
    const existing = acc.find(x => x.name === item.category);
    if (existing) existing.value += item.quantity || 0;
    else acc.push({ name: item.category || "Sin categoría", value: item.quantity || 0 });
    return acc;
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];
  const bookStatusData = [
    { name: "Disponible", value: totalBooks - borrowedBooks },
    { name: "Prestado", value: borrowedBooks }
  ];

  // últimos avisos y próximos eventos
  const recentNotices = [...safeNotices].reverse().slice(0, 3);
  const upcomingEvents = [...safeEvents]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  return (
    <div className="dashboard-wrapper">
      {/* sidebar */}
      <Sidebar currentView={view} setView={setView} isOpen={true} onLogout={() => alert("Salir")} />

      <div className="dashboard-content">
        {/* header */}
        <SchoolHeader />

        {/* tarjetas de estadísticas */}
        <div className="stats-grid">
          <StatCard title="Total Artículos" value={totalItems} icon={Package} color="blue" subtext="En inventario general" />
          <StatCard title="Stock Bajo" value={lowStock} icon={AlertTriangle} color="orange" subtext="Items con < 5 unidades" />
          <StatCard title="Libros Total" value={totalBooks} icon={Book} color="purple" subtext="En biblioteca" />
          <StatCard title="Préstamos Activos" value={borrowedBooks} icon={CheckCircle} color="green" subtext="Libros fuera" />
        </div>

        {/* gráficas */}
        <div className="charts-grid">
          <div className="chart-card">
            <h3>Distribución por Categoría</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>Disponibilidad Biblioteca</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookStatusData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* avisos y eventos */}
        <div className="notices-events-grid">
          <div className="notices-card">
            <div className="card-header"><h3>Avisos Recientes</h3></div>
            {recentNotices.length === 0 ? (
              <p className="empty-text">No hay avisos recientes.</p>
            ) : (
              recentNotices.map((notice) => (
                <div key={notice.id} className="notice-item">
                  <div className={`notice-type ${notice.type.toLowerCase()}`}></div>
                  <div>
                    <h4>{notice.title}</h4>
                    <p>{notice.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="events-card">
            <div className="card-header"><h3>Próximos Eventos</h3></div>
            {upcomingEvents.length === 0 ? (
              <p className="empty-text">Sin eventos próximos.</p>
            ) : (
              upcomingEvents.map((event) => {
                const evtDate = new Date(event.date);
                return (
                  <div key={event.id} className="event-item">
                    <div className="event-date">
                      <span>{evtDate.getDate()}</span>
                      <small>{evtDate.toLocaleDateString("es-MX", { month: "short" }).slice(0, 3)}</small>
                    </div>
                    <div className="event-info">
                      <h4>{event.title}</h4>
                      <p>{event.time} | {event.location}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
