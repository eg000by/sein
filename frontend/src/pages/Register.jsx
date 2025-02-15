import React, { useState } from "react";
import { register, login } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";
import "../styles/identification.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Регистрация
      await register(username, password);
      
      // Автоматический вход после регистрации
      const { access, refresh } = await login(username, password);
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      
      // Перенаправление на выбор ценностей
      navigate("/select-values");
    } catch (error) {
      setMessage(error.response?.data?.detail || "Ошибка регистрации");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Регистрация</h2>
      <form onSubmit={handleRegister} className="auth-form">
        <div>
          <label className="auth-label">Имя пользователя</label>
          <input
            type="text"
            placeholder="Введите имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="auth-input"
            required
          />
        </div>
        
        <div>
          <label className="auth-label">Пароль</label>
          <input
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
            required
          />
        </div>

        {message && <p className="auth-error">{message}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="auth-button"
        >
          {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>

      <div className="auth-register-link">
        <p>
          Уже есть аккаунт?{" "}
          <Link to="/login" className="auth-register-link-text">
            Войдите
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
