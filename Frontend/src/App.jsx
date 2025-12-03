import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Alumnos from "./pages/Alumnos";
import Biblioteca from "./pages/Biblioteca";
import Inventory from "./pages/Inventory";
import Settings from "./pages/Settings";
import Prestamos from "./pages/Prestamos"; 

import Users from "./components/Users";
import Categories from "./components/Category";

import { MainLayout } from "./components/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/" element={<Login />} />

        {/* DASHBOARD */}
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

        {/* PRÉSTAMOS (AGREGADA) */}
        <Route
          path="/prestamos"
          element={
            <MainLayout>
              <Prestamos />
            </MainLayout>
          }
        />

        {/* SETTINGS */}
        <Route
          path="/settings"
          element={
            <MainLayout>
              <Settings />
            </MainLayout>
          }
        >
          <Route path="users" element={<Users />} />
          <Route path="categories" element={<Categories />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
