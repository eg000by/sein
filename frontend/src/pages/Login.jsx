import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Авторизация</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded mb-2 w-full"
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded mb-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Войти
        </button>
      </form>
      {message && <p className="mt-2 text-red-500">{message}</p>}

      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Ещё нет аккаунта?{' '}
          <Link 
            to="/register" 
            className="text-blue-500 hover:text-blue-600 underline"
            >
          Зарегистрируйтесь
            </Link>
          </p>
      </div>

    </div>
  );
};

export default Login;
