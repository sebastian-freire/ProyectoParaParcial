import React, { useState } from "react";
import "./loginCard.css";

function LoginCard({ handleUser }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setValue(e.target.email.value);
    handleUser(e.traget.email.value)
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Iniciar Sesión</h2>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input type="email" name="email" id="email" required />
        </div>
        <button type="submit">Entrar</button>
        {value && (
          <p className="resultado">
            Resultado: <span>{value}</span>
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginCard;
