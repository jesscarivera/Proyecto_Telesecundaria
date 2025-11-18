import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../components/Login.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mensaje, setMensaje] = useState("");

  const navigate = useNavigate();

  // ----- Slider automático -----
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === 0 ? 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // ----- Acción al iniciar sesión -----
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contraseña }),
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        setMensaje(data.mensaje);
        return;
      }

      setMensaje("Ingreso exitoso ✓");

      // Guardar usuario en localStorage
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      // Redirigir
      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      setMensaje("Error de conexión con el servidor");
    }
  };

  return (
    <main className="login-container">
      
      {/* ------ IZQUIERDA: Slider de Imagen ------ */}
      <section className="login-left slider-container">
        <img
          src="/log1.png"
          alt="Imagen 1"
          className={`login-image slider-image ${currentImage === 0 ? "active" : ""}`}
        />
        <img
          src="/log2.png"
          alt="Imagen 2"
          className={`login-image slider-image ${currentImage === 1 ? "active" : ""}`}
        />
      </section>

      {/* ------ DERECHA: Formulario ------ */}
      <section className="login-right">

        {/* Logos */}
        <header className="login-logos">
          <img src="/dgogob.png" alt="Gobierno de Durango" className="logo-durango" />
          <img src="/setelLog.png" alt="SETEL Durango" className="logo-setel" />
        </header>

        <h1 className="login-title">
          Bienvenido a<br />Telesecundaria No. 531
        </h1>

        {/* FORMULARIO */}
        <form className="login-form" onSubmit={handleLogin}>
          <label htmlFor="email" className="login-label">Correo</label>
          <input
            id="email"
            type="email"
            placeholder="Ingresa tu correo"
            className="login-input"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />

          <label htmlFor="password" className="login-label">Contraseña</label>

          {/* Campo contraseña con icono */}
          <div className="password-area">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Ingresa tu contraseña"
              className="login-input password-input"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
            />

            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg width="22" height="22" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12 5C7 5 2.7 8.1 1 12c1.7 3.9 6 7 11 7s9.3-3.1 11-7c-1.7-3.9-6-7-11-7zm0 12a5 5 0 110-10 5 5 0 010 10zm0-8a3 3 0 100 6 3 3 0 000-6z"
                  />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M2 12c2-4 6-7 10-7s8 3 10 7c-2 4-6 7-10 7s-8-3-10-7zm3 0h14c-1.8 2.2-4.2 4-7 4s-5.2-1.8-7-4z"
                  />
                </svg>
              )}
            </span>
          </div>

          <button type="submit" className="login-button">Iniciar Sesión</button>

          {mensaje && <p>{mensaje}</p>}
        </form>
      </section>
    </main>
  );
};

export default Login;
