import React, { useRef } from "react";
import { useUser } from "../context/userContext";
import { Navigate, Outlet, useNavigate, Link } from "react-router-dom";

function LoginPage() {
  const { login, logout, isLoggedIn } = useUser();
  const usernameInput = useRef(null);
  const navigate = useNavigate();
  
  const handleLoginClick = () => {
    const username = usernameInput.current.value;
    if (username.trim() === "") {
      return;
    }
    login(username);
    usernameInput.current.value = "";
    navigate("/quiz_selector");
  };
  const handleLogoutClick = () => {
    logout();
  };
  return (
    <>
      <h1>log in</h1>
      {isLoggedIn && (
        <>
          <Link to="/quiz_selector">Ir a Quiz Selector</Link>
          <br />
          <br />
        </>
      )}

      <input
        type="text"
        id="username"
        ref={usernameInput}
        placeholder="Ingresa tu nombre"
        required
      />
      <button onClick={handleLoginClick}>Iniciar Sesión</button>
      {isLoggedIn && <button onClick={handleLogoutClick}>Cerrar Sesión</button>}
    </>
  );
}

export default LoginPage;
