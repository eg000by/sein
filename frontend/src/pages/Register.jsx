import React, { useState } from "react";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { API_URL } from '../api/auth';

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await register(username, password);
      setMessage("Регистрация успешна! Теперь войдите в систему.");
      navigate('/login');
    } catch (error) {
      setMessage("Ошибка регистрации. Попробуйте снова.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Регистрация</h2>
      <form onSubmit={handleRegister}>
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
          Зарегистрироваться
        </button>
      </form>
      {message && <p className="mt-2 text-red-500">{message}</p>}
    </div>
  );
};

export default Register;
