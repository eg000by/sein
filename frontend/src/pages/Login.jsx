import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <div className="login-container">
  <h2 className="login-title">Авторизация</h2>
  <form onSubmit={handleLogin} className="login-form">
    <input
      type="text"
      placeholder="Имя пользователя"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      className="login-input"
    />
    <input
      type="password"
      placeholder="Пароль"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="login-input"
    />
    <button type="submit" className="login-button">
      Войти
    </button>
  </form>
  {message && <p className="login-error">{message}</p>}
</div>
  );
};

export default Login;
