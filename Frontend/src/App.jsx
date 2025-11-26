import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Alumnos from "./pages/Alumnos";
import Biblioteca from "./pages/Biblioteca";
import { Inventory } from "./pages/Inventory";
import { MainLayout } from "./components/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route path="/" element={<Login />} />

        {/* DASHBOARD con layout */}
        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />

        {/* ALUMNOS */}
        <Route
          path="/alumnos"
          element={
            <MainLayout>
              <Alumnos />
            </MainLayout>
          }
        />

        {/* INVENTARIO */}
        <Route
          path="/inventario"
          element={
            <MainLayout>
              <Inventory />
            </MainLayout>
          }
        />

        {/* BIBLIOTECA */}
        <Route
          path="/biblioteca"
          element={
            <MainLayout>
              <Biblioteca />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

