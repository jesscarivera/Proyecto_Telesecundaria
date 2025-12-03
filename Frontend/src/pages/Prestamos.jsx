import React, { useState, useEffect } from "react";
import axios from "axios";
import { BookOpen, Eye, Pencil, Trash2, Plus, Bell, CheckCircle } from "lucide-react";
import ModalReutilizable from "../components/ModalReutilizable";
import "../components/Prestamos.css";

export default function Prestamos() {
  const [prestamos, setPrestamos] = useState([]);
  const [libros, setLibros] = useState([]);
  const [alumnos, setAlumnos] = useState([]);

  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);

  const [form, setForm] = useState({
    book_id: "",
    student_enrollment: "",
    loan_date: "",
    due_date: ""
  });

  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const loadPrestamos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/loans/get");
      setPrestamos(res.data);
    } catch (error) {
      alert("Error cargando préstamos: " + (error.response?.data?.message || error.message));
    }
  };

  const loadLibros = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/library/get");
      setLibros(res.data);
    } catch (error) {
      alert("Error cargando libros: " + (error.response?.data?.message || error.message));
    }
  };

  const loadAlumnos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/students/get");
      setAlumnos(res.data);
    } catch (error) {
      alert("Error cargando alumnos: " + (error.response?.data?.message || error.message));
    }
  };

  useEffect(() => {
    loadPrestamos();
    loadLibros();
    loadAlumnos();
  }, []);

  const handleAgregar = async (e) => {
    e.preventDefault();

    if (!form.book_id) return alert("Selecciona un libro válido.");
    if (!form.student_enrollment) return alert("Selecciona un alumno válido.");
    if (!form.loan_date || !form.due_date)
      return alert("Selecciona fecha de préstamo y fecha de devolución.");

    try {
      const payload = {
        book_id: Number(form.book_id),
        student_enrollment: form.student_enrollment,
        loan_date: form.loan_date,
        due_date: form.due_date
      };

      console.log("Payload a enviar:", payload);

      const res = await axios.post("http://localhost:3000/api/loans/add", payload);
      const createdLoan = res.data?.loan ?? res.data;

      if (createdLoan) {
        setPrestamos((prev) => [createdLoan, ...prev]);
      } else {
        await loadPrestamos();
      }

      setModal(null);
      setForm({ book_id: "", student_enrollment: "", loan_date: "", due_date: "" });
    } catch (error) {
      alert("No se pudo agregar préstamo: " + (error.response?.data?.message || error.message));
    }
  };

  const handleEditar = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3000/api/loans/update/${selected.id}`, {
        book_id: Number(form.book_id),
        student_enrollment: form.student_enrollment,
        loan_date: form.loan_date,
        due_date: form.due_date
      });

      await loadPrestamos();
      setModal(null);
    } catch (error) {
      alert("Error editando préstamo: " + (error.response?.data?.message || error.message));
    }
  };

  const handleEliminar = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/loans/delete/${selected.id}`);
      setPrestamos((prev) => prev.filter((p) => p.id !== selected.id));
      setModal(null);
    } catch (error) {
      alert("Error eliminando préstamo: " + (error.response?.data?.message || error.message));
    }
  };

  const marcarDevuelto = async (id) => {
    try {
      const res = await axios.put(`http://localhost:3000/api/loans/return/${id}`);
      const updated = res.data?.loan ?? res.data;

      if (updated?.id) {
        setPrestamos((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      } else {
        await loadPrestamos();
      }
    } catch (error) {
      alert("Error marcando como devuelto: " + (error.response?.data?.message || error.message));
    }
  };

  const traducirEstado = (p) => {
    if (p.return_date) return "Devuelto";
    if (p.alert_status === "vencido") return "Vencido";
    if (p.alert_status === "por_vencer") return "Por vencer";
    return "Prestado";
  };

  const getBadgeClass = (p) => {
    if (p.return_date) return "badge badge-green";
    if (p.alert_status === "por_vencer") return "badge badge-yellow";
    if (p.alert_status === "vencido") return "badge badge-red";
    return "badge badge-blue";
  };

  const getRowClass = (alert) => {
    if (alert === "vencido") return "row-red";
    if (alert === "por_vencer") return "row-yellow";
    return "";
  };

  const prestamosFiltrados = prestamos.filter((p) => {
    const texto = search.toLowerCase();
    return (
      p.Student?.name.toLowerCase().includes(texto) ||
      p.Student?.Last_Name.toLowerCase().includes(texto) ||
      p.student_enrollment.toLowerCase().includes(texto) ||
      p.Book?.title.toLowerCase().includes(texto)
    );
  });

  return (
    <div className="inventory-container">
      <div className="inv-header">
        <div>
          <h1 className="inv-title">
            <BookOpen className="inv-icon" size={38} />
            Préstamos
          </h1>
          <p className="inv-subtitle">Control de préstamos de libros</p>
        </div>

        <div className="inv-summary-boxes right-corner">
          <div className="inv-summary-card">
            <p className="inv-summary-title">Total</p>
            <p className="inv-summary-value">{prestamos.length}</p>
          </div>

          <div className="inv-summary-card">
            <p className="inv-summary-title">Activos</p>
            <p className="inv-summary-value">
              {prestamos.filter((p) => !p.return_date).length}
            </p>
          </div>
        </div>
      </div>

      <div className="inv-controls" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <input
          type="text"
          placeholder="Buscar por libro, alumno o matrícula..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="buscador-prestamos"
          style={{
            flex: 1,
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "15px"
          }}
        />

        <button
          className="btn-add"
          onClick={() => {
            setForm({ book_id: "", student_enrollment: "", loan_date: "", due_date: "" });
            setSelected(null);
            setModal("agregar");
          }}
        >
          <Plus size={18} /> Registrar Préstamo
        </button>
      </div>

      <div className="inv-table-wrapper">
        <table className="inv-table">
          <thead>
            <tr>
              <th>Alerta</th>
              <th>Libro</th>
              <th>Alumno</th>
              <th>Matrícula</th>
              <th>Grupo</th>
              <th>Préstamo</th>
              <th>Devolución</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {prestamosFiltrados.length === 0 ? (
              <tr>
                <td colSpan="9" className="no-data">
                  No hay préstamos registrados
                </td>
              </tr>
            ) : (
              prestamosFiltrados.map((p) => (
                <tr key={p.id} className={getRowClass(p.alert_status)}>
                  <td>{p.alert_status === "por_vencer" && <Bell size={18} className="alert-bell" />}</td>

                  <td>{p.Book?.title}</td>
                  <td>{p.Student?.name} {p.Student?.Last_Name}</td>
                  <td>{p.student_enrollment}</td>
                  <td>{p.Student?.grade}{p.Student?.group}</td>
                  <td>{p.loan_date?.slice(0, 10)}</td>
                  <td>{p.due_date?.slice(0, 10)}</td>

                  <td>
                    <span className={getBadgeClass(p)}>
                      {traducirEstado(p)}
                    </span>
                  </td>

                  <td className="inv-actions">
                    <button className="act" onClick={() => { setSelected(p); setModal("ver"); }}>
                      <Eye size={20} stroke="#000" />
                    </button>

                    {!p.return_date && (
                      <button className="act act-green" onClick={() => marcarDevuelto(p.id)}>
                        <CheckCircle size={20} stroke="#000" />
                      </button>
                    )}

                    {!p.return_date && (
                      <button
                        className="act act-edit"
                        onClick={() => {
                          setSelected(p);
                          setForm({
                            book_id: p.book_id.toString(),
                            student_enrollment: p.student_enrollment,
                            loan_date: p.loan_date?.slice(0, 10),
                            due_date: p.due_date?.slice(0, 10)
                          });
                          setModal("editar");
                        }}
                      >
                        <Pencil size={20} stroke="#000" />
                      </button>
                    )}

                    <button
                      className="act act-del"
                      onClick={() => {
                        setSelected(p);
                        setModal("eliminar");
                      }}
                    >
                      <Trash2 size={20} stroke="#000" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modal && (
        <ModalReutilizable
          tipo={modal}
          titulo={
            modal === "agregar"
              ? "Registrar préstamo"
              : modal === "editar"
              ? "Editar préstamo"
              : modal === "ver"
              ? "Detalles del préstamo"
              : "Eliminar préstamo"
          }
          datos={selected}
          nombreElemento={selected?.Book?.title}
          onClose={() => setModal(null)}
          onSubmit={
            modal === "agregar"
              ? handleAgregar
              : modal === "editar"
              ? handleEditar
              : modal === "eliminar"
              ? handleEliminar
              : null
          }
        >
          {(modal === "agregar" || modal === "editar") && (
            <>
              <label>Libro</label>
              <select
                name="book_id"
                value={form.book_id}
                onChange={(e) =>
                  setForm({ ...form, book_id: e.target.value })
                }
                required
              >
                <option value="">Seleccione un libro</option>
                {libros.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.title}
                  </option>
                ))}
              </select>

              <label>Alumno</label>
              <select
                name="student_enrollment"
                value={form.student_enrollment}
                onChange={(e) =>
                  setForm({
                    ...form,
                    student_enrollment: e.target.value
                  })
                }
                required
              >
                <option value="">Seleccione un alumno</option>

                {alumnos.map((a) => (
                  <option key={a.enrollment} value={a.enrollment}>
                    {a.name} {a.Last_Name} — {a.enrollment} — {a.grade}{a.group}
                  </option>
                ))}

              </select>

              <label>Fecha de préstamo</label>
              <input
                type="date"
                name="loan_date"
                value={form.loan_date}
                onChange={handleChange}
                required
              />

              <label>Fecha de devolución</label>
              <input
                type="date"
                name="due_date"
                value={form.due_date}
                onChange={handleChange}
                required
              />
            </>
          )}

          {modal === "ver" && selected && (
            <div className="view-details">
              <p><strong>Libro:</strong> {selected.Book?.title}</p>
              <p><strong>Alumno:</strong> {selected.Student?.name} {selected.Student?.Last_Name}</p>
              <p><strong>Matrícula:</strong> {selected.student_enrollment}</p>
              <p><strong>Grado y Grupo:</strong> {selected.Student?.grade}{selected.Student?.group}</p>
              <p><strong>Préstamo:</strong> {selected.loan_date?.slice(0, 10)}</p>
              <p><strong>Devolución:</strong> {selected.due_date?.slice(0, 10)}</p>
            </div>
          )}
        </ModalReutilizable>
      )}
    </div>
  );
}
