import React, { useState } from "react";
import { register, login } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { API_URL } from '../api/auth';

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
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Регистрация</h2>
            <form onSubmit={handleRegister} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Имя пользователя</label>
                    <input
                        type="text"
                        placeholder="Введите имя пользователя"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium mb-1">Пароль</label>
                    <input
                        type="password"
                        placeholder="Введите пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                {message && <p className="text-red-500 text-sm">{message}</p>}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600
                        disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
                </button>
            </form>
        </div>
    );
};

export default Register;
