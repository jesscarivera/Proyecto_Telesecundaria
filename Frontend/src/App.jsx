import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Alumnos from "./pages/Alumnos";
import Inventario from "./pages/Inventario";
import Biblioteca from "./pages/Biblioteca";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Aquí agregas tus páginas */}
        <Route path="/alumnos" element={<Alumnos />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/biblioteca" element={<Biblioteca />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
