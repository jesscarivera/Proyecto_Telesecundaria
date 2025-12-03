import React, { useState, useEffect } from "react";
import { Sidebar } from "../components/Sidedar";
import { SchoolHeader } from "../components/SchoolHeader";
import { Package, Book, AlertTriangle, CheckCircle } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import "../components/Dashboard.css";
import RecentNotices from "../components/RecentNotices";
import Events from "../components/Events";

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

export default function Dashboard() {
  const [inventory, setInventory] = useState([]);
  const [library, setLibrary] = useState([]);
  const [notices, setNotices] = useState([]);
  const [events, setEvents] = useState([]);

  const dynamicColors = [
    "#6f42c1",
    "#28a745",
    "#fd7e14",
    "#17a2b8",
    "#dc3545",
    "#ffc107",
    "#20c997",
    "#6610f2"
  ];

  const colorMap = {};

  const getColorForCategory = (name) => {
    if (!colorMap[name]) {
      colorMap[name] = dynamicColors[Object.keys(colorMap).length % dynamicColors.length];
    }
    return colorMap[name];
  };

  useEffect(() => {
    async function loadData() {
      try {
        const inv = await fetch("http://localhost:3000/api/inventory/get");
        const lib = await fetch("http://localhost:3000/api/library/get");

        const noti = await fetch("http://localhost:3000/api/notices");

        const evt = await fetch("http://localhost:3000/api/events/get");

        setInventory(await inv.json());
        setLibrary(await lib.json());
        setNotices(await noti.json());

        const evtJson = await evt.json();
        const eventosRaw = evtJson.events || [];

        const eventosAdaptados = eventosRaw.map((e) => {
          const fecha = new Date(e.date);
          return {
            id: e.id,
            name: e.name,
            descripcion: e.description,
            date: e.date,
            fechaSolo: fecha.toISOString().slice(0, 10),
            horaSolo: fecha.toISOString().slice(11, 16)
          };
        });

        setEvents(eventosAdaptados);
      } catch (error) {
        console.error("Error cargando datos del backend:", error);
      }
    }

    loadData();
  }, []);

  const [view, setView] = useState("dashboard");

  const safeInventory = Array.isArray(inventory) ? inventory : [];
  const safeLibrary = Array.isArray(library) ? library : [];
  const safeNotices = Array.isArray(notices) ? notices : [];

  return (
    <div className="dashboard-wrapper">
      <Sidebar
        currentView={view}
        setView={setView}
        isOpen={true}
        onLogout={() => alert("Salir")}
      />

      <div className="dashboard-content">
        <SchoolHeader />

        <div className="stats-grid">
          <StatCard
            title="Total Artículos"
            value={safeInventory.reduce((acc, item) => acc + (item.quantity || 0), 0)}
            icon={Package}
            color="blue"
            subtext="En inventario general"
          />

          <StatCard
            title="Stock Bajo"
            value={safeInventory.filter((i) => (i.quantity || 0) < 5).length}
            icon={AlertTriangle}
            color="orange"
            subtext="Items con < 5 unidades"
          />

          <StatCard
            title="Libros Total"
            value={safeLibrary.reduce((acc, b) => acc + (b.copies_availables || 0), 0)}
            icon={Book}
            color="purple"
            subtext="Ejemplares en biblioteca"
          />

          <StatCard
            title="Préstamos Activos"
            value={safeLibrary.reduce((acc, b) =>
              acc + Math.max((b.copies_total || 0) - (b.copies_availables || 0), 0)
            , 0)}
            icon={CheckCircle}
            color="green"
            subtext="Libros fuera"
          />
        </div>

        <div className="charts-grid">
          <div className="chart-card">
            <h3>Distribución por Categoría</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={safeInventory.reduce((acc, item) => {
                    const categoria =
                      item.category?.name || item.category || "Sin categoría";

                    const existing = acc.find((x) => x.name === categoria);
                    if (existing) existing.value += item.quantity || 0;
                    else acc.push({ name: categoria, value: item.quantity || 0 });

                    return acc;
                  }, [])}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {safeInventory.map((item, index) => {
                    const categoria =
                      item.category?.name || item.category || "Sin categoría";
                    return (
                      <Cell
                        key={index}
                        fill={getColorForCategory(categoria)}
                      />
                    );
                  })}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>Disponibilidad Biblioteca</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  {
                    name: "Disponible",
                    value: safeLibrary.filter(
                      (b) => (b.copies_availables || 0) > 0
                    ).length
                  },
                  {
                    name: "Prestado",
                    value: safeLibrary.reduce(
                      (acc, b) =>
                        acc +
                        Math.max(
                          (b.copies_total || 0) - (b.copies_availables || 0),
                          0
                        ),
                      0
                    )
                  }
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="notices-events-grid">
          <RecentNotices notices={safeNotices} />

          <div className="card dashboard-card">
            <Events />
          </div>
        </div>

      </div>
    </div>
  );
}
