import React from "react";
import "../components/Dashboard.css"; 
import { Home, ClipboardList, Book, Users, Settings, LogOut } from "lucide-react";

// --- Datos ---
const sidebarItems = [
  { icon: Home, label: "Inicio", active: true },
  { icon: ClipboardList, label: "Inventario", active: false },
  { icon: Book, label: "Biblioteca", active: false },
  { icon: Users, label: "Alumnos", active: false },
];

const bottomSidebarItems = [
  { icon: Settings, label: "Configuración", active: false },
  { icon: LogOut, label: "Salir", active: false },
];

const attendanceData = [
  { month: "Ene", percentage: 20 },
  { month: "Feb", percentage: 10 },
  { month: "Mar", percentage: 20 },
  { month: "Abr", percentage: 30 },
  { month: "May", percentage: 5 },
];

const currentMonthData = {
  name: "NOVIEMBRE",
  year: 2025,
  days: [
    null, null, null, null, null, 1, 2,
    3, 4, 5, 6, 7, 8, 9,
    10, 11, 12, 13, 14, 15, 16,
    17, 18, 19, 20, 21, 22, 23,
    24, 25, 26, 27, 28, 29, 30,
  ],
  highlightedDates: [18, 19, 20, 21, 22, 29],
};

const importantNotices = [
  "Junta de padres de familia 01/Dic/2025",
  "Entrega de boletas el 10/Dic/2025",
  "Mantenimiento de Sistema 01/Ene/2026",
];

// ================= SIDEBAR =================
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

// ================= CARD =================
const StatCard = ({ title, children }) => (
  <div className="card">
    <h2>{title}</h2>
    {children}
  </div>
);

// ================= GRÁFICA =================
const AttendanceChart = ({ data }) => {
  const maxValue = 30;
  const height = 180;
  const barWidth = 30;
  const spacing = 40;
  const padding = 20;

  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 ${data.length * (barWidth + spacing) + padding * 2} ${height}`}
    >
      {data.map((item, index) => {
        const barHeight = (item.percentage / maxValue) * (height - padding);
        const xPos = index * (barWidth + spacing) + padding;
        const yPos = height - barHeight - padding / 2;

        return (
          <g key={item.month}>
            <rect
              x={xPos}
              y={yPos}
              width={barWidth}
              height={barHeight}
              rx="4"
              fill="#808080"
            />
            <text
              x={xPos + barWidth / 2}
              y={height - 5}
              fontSize="12"
              fill="#555"
              textAnchor="middle"
            >
              {item.month}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

// ================= CALENDARIO =================
const CalendarMonth = ({ data }) => (
  <div className="calendar-month">
    <div className="header">
      <span>{data.name}</span> <span>{data.year}</span>
    </div>

    <div className="days-header">
      {["D", "L", "M", "M", "J", "V", "S"].map((d, i) => (
        <div key={i}>{d}</div>
      ))}
    </div>

    <div className="days-grid">
      {data.days.map((day, i) => {
        const highlighted = data.highlightedDates.includes(day);
        const weekend = i % 7 === 0 || i % 7 === 6;

        return (
          <div
            key={i}
            className={`calendar-day 
              ${day === null ? "disabled" : ""}
              ${highlighted ? "highlight" : ""}
              ${weekend ? "weekend" : ""}
            `}
          >
            {day}
          </div>
        );
      })}
    </div>
  </div>
);

// ================= APP PRINCIPAL =================
const App = () => {
  return (
    <div className="app-container">
      <Sidebar />

      <main className="main-content">

        {/* ==== LOGOS ENCABEZADO ==== */}
        <header className="dashboard-header">
          <img src="/dgogob.png" alt="Gobierno de Durango" className="header-logo" />
          <img src="/setelLog.png" alt="SETEL Durango" className="header-logo" />
        </header>

        {/* ==== TÍTULO PRINCIPAL ==== */}
        <header className="title-header">
          <h1>Telesecundaria No. 531</h1>
          <p className="subtitle">Tablero</p>
        </header>

        {/* ==== TARJETAS PRINCIPALES ==== */}
        <section className="grid-2">
          <StatCard title="Estadísticas Rápidas">
            <p>Total de Alumnos: <strong>100</strong></p>
            <p>Total de Docentes: <strong>20</strong></p>
          </StatCard>

          <StatCard title="Gráfica de Asistencia">
            <AttendanceChart data={attendanceData} />
          </StatCard>
        </section>

        {/* ==== CALENDARIO + FIESTAS ==== */}
        <section className="grid-3">
          <div className="calendar-container">
            <h2>Calendario Escolar</h2>
            <div className="calendar-row">
              <CalendarMonth data={{ name: "AGOSTO", year: 2025, days: Array(31).fill(0).map((_, i) => i + 1), highlightedDates: [] }} />
              <CalendarMonth data={{ name: "SEPTIEMBRE", year: 2025, days: Array(30).fill(0).map((_, i) => i + 1), highlightedDates: [] }} />
              <CalendarMonth data={{ name: "OCTUBRE", year: 2025, days: Array(31).fill(0).map((_, i) => i + 1), highlightedDates: [] }} />
              <CalendarMonth data={currentMonthData} />
            </div>
          </div>

          <div className="calendar-side-card">
            <div className="notices-box">
              <p className="title">FESTIVIDADES Y VACACIONES</p>
              <ul>
                <li>Vacaciones Invierno: 18 - 29 Dic</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ==== AVISOS IMPORTANTES ==== */}
        <section>
          <div className="notices-card">
            <h2>Avisos Importantes</h2>
            <ul>
              {importantNotices.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
