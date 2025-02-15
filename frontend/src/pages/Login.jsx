import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/auth";
import "../styles/identification.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { access, refresh } = await login(username, password);
      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);
      navigate('/dashboard');
    } catch (error) {
      let message = 'Ошибка входа';
      if (error.response) {
        message = error.response.data.detail || message;
      }
      setMessage(message);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Авторизация</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
        />
        <button type="submit" className="auth-button">
          Войти
        </button>
      </form>
      {message && <p className="auth-error">{message}</p>}

      <div className="auth-register-link">
        <p>
          Ещё нет аккаунта?{" "}
          <Link to="/register" className="auth-register-link-text">
            Зарегистрируйтесь
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

