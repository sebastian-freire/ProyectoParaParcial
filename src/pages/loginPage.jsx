import './loginPage.css';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";

function LoginPage() {
  const [name, setName] = useState("");
  const { userHandle } = useUser();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (name.trim()) {
      userHandle(name); 
      navigate("/quiz_selector");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Usuario</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ingrese usuario"
          className="login-input"
        />
        <button
          onClick={handleLogin}
          className="login-button"
        >
          Usuario
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
