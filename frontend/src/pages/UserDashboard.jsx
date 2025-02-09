import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGoals } from "../api/goals";
import { logout } from "../api/auth"; // Убедитесь, что функция logout существует в auth.js

const UserDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [goals, setGoals] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Вызываем функцию logout из auth.js
        navigate("/login"); // Перенаправляем на страницу входа
    };

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const data = await getGoals();
                setGoals(data);
            } catch (error) {
                setError("Ошибка при загрузке целей.");
            } finally {
                setLoading(false);
            }
        };

        fetchGoals();
    }, []);

    if (loading) return <div className="p-4">Загрузка...</div>;

    return (
        <div className="p-4 relative">
            {/* Кнопка выхода в правом верхнем углу */}
            <button
                onClick={handleLogout}
                className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
                Выйти
            </button>

            <h2 className="text-xl font-bold mb-4">Ваши цели</h2>
            {error && <p className="text-red-500">{error}</p>}
            
            {!error && goals.length === 0 ? (
                <p className="text-gray-500">У вас пока нет целей. Создайте первую!</p>
            ) : (
                <ul className="list-disc pl-5">
                    {goals.map((goal) => (
                        <li key={goal.id} className="mb-4 p-4 bg-white rounded shadow">
                            <h3 className="font-semibold text-lg">{goal.title}</h3>
                            <p className="text-gray-600 mt-1">{goal.description}</p>
                            <div className="mt-2 flex justify-between items-center">
                                <span className={`px-2 py-1 rounded ${
                                    goal.status === 'completed' 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-blue-100 text-blue-800'
                                }`}>
                                    {goal.status === 'completed' ? 'Выполнено' : 'Активно'}
                                </span>
                                <p className="text-sm text-gray-500">
                                    Дедлайн: {new Date(goal.deadline).toLocaleDateString()}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserDashboard;