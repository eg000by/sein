import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGoals, createGoal } from "../api/goals";
import { logout } from "../api/auth"; 
import { getUserValues } from "../api/values";

const UserDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [goals, setGoals] = useState([]);
    const [error, setError] = useState("");
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newGoal, setNewGoal] = useState({
        title: "",
        description: "",
        deadline: "",
        value: ""
    });
    const [userValues, setUserValues] = useState([]); // Переименовано с values
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Вызываем функцию logout из auth.js
        navigate("/login"); // Перенаправляем на страницу входа
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Загрузка целей
                const goalsData = await getGoals();
                setGoals(goalsData);

                // Загрузка ценностей пользователя
                const valuesResponse = await getUserValues();
                setUserValues(valuesResponse.map(uv => uv.value)); // Извлекаем value из UserVal
            } catch (error) {
                setError("Ошибка загрузки данных");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleCreateGoal = async (e) => {
        e.preventDefault();
        try {
            await createGoal(newGoal);
            // Обновляем список целей
            const updatedGoals = await getGoals();
            setGoals(updatedGoals);
            // Сбрасываем форму
            setShowCreateForm(false);
            setNewGoal({
                title: "",
                description: "",
                deadline: "",
                value: ""
            });
        } catch (error) {
            setError("Ошибка создания цели");
        }
    };

    if (loading) return <div className="p-4">Загрузка...</div>;

    if (userValues.length === 0) {
    return (
        <div className="p-4">
            <p className="text-red-500 mb-4">У вас не выбраны ценности!</p>
            <button 
                onClick={() => navigate('/select-values')}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Выбрать ценности
            </button>
        </div>
    );
}

    return (
        <div className="p-4 relative">
            <button
                onClick={handleLogout}
                className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
                Выйти
            </button>

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Ваши цели</h2>
                <button
                    onClick={() => setShowCreateForm(true)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                    + Создать цель
                </button>
            </div>

            {showCreateForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h3 className="text-lg font-bold mb-4">Новая цель</h3>
                        <form onSubmit={handleCreateGoal}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block mb-1">Название</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full p-2 border rounded"
                                        value={newGoal.title}
                                        onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                                    />
                                </div>
                                
                                <div>
                                    <label className="block mb-1">Описание</label>
                                    <textarea
                                        className="w-full p-2 border rounded"
                                        value={newGoal.description}
                                        onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                                    />
                                </div>
                                
                                <div>
                                    <label className="block mb-1">Ценность</label>
                                    <select
                                        required
                                        className="w-full p-2 border rounded"
                                        value={newGoal.value}
                                        onChange={(e) => setNewGoal({...newGoal, value: e.target.value})}
                                    >
                                        <option value="">Выберите ценность</option>
                                        {userValues.map(value => (
                                            <option key={value.id} value={value.id}>
                                                {value.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block mb-1">Дедлайн</label>
                                    <input
                                        type="date"
                                        required
                                        className="w-full p-2 border rounded"
                                        value={newGoal.deadline}
                                        onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateForm(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Отмена
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Создать
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {error && <p className="text-red-500 mb-4">{error}</p>}
            
            {goals.length === 0 ? (
                <p className="text-gray-500">У вас пока нет целей. Нажмите кнопку выше чтобы создать первую!</p>
            ) : (
                <div className="space-y-4">
                    {goals.map((goal) => (
                        <div key={goal.id} className="p-4 bg-white rounded shadow">
                            <h3 className="font-semibold text-lg">{goal.title}</h3>
                            <p className="text-gray-600 mt-1">{goal.description}</p>
                            <div className="mt-2 flex justify-between items-center">
                                <span className="text-sm text-gray-500">
                                    Ценность: {userValues.find(v => v.id === goal.value)?.name}
                                </span>
                                <span className="text-sm text-gray-500">
                                    Дедлайн: {new Date(goal.deadline).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>  
    );
};

export default UserDashboard;