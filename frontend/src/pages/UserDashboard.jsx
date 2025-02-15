import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGoals, createGoal, updateGoalStatus } from "../api/goals";
import { logout } from "../api/auth"; 
import { getUserValues } from "../api/values";
import ValuesChart from "../components/ValuesChart";

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
    const [userValues, setUserValues] = useState([]);
    const [values, setValues] = useState([]);
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
                setValues(valuesResponse)
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

    const handleStatusChange = async (goalId, currentStatus) => {
        const newStatus = currentStatus === 'completed' ? 'active' : 'completed';
        
        try {
            // Оптимистичное обновление
            setGoals(prev => prev.map(goal => 
                goal.id === goalId ? { ...goal, status: newStatus } : goal
            ));
            
            await updateGoalStatus(goalId, newStatus);
        } catch (error) {
            // Откат при ошибке
            setGoals(prev => prev.map(goal => 
                goal.id === goalId ? { ...goal, status: currentStatus } : goal
            ));
            setError("Не удалось обновить статус цели");
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
                <div key={goal.id} className="p-4 bg-white rounded shadow flex items-start">
                    <div className="flex-1">
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
                    </div>
                    
                   
                    <label className="ml-4 flex items-center">
                        <input
                            type="checkbox"
                            checked={goal.status === 'completed'}
                            onChange={() => handleStatusChange(goal.id, goal.status)}
                            className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                    </label>
                </div>
            ))}
                </div>
            )}

            <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Прогресс по ценностям</h2>
      <div className="max-w-md mx-auto">
        <ValuesChart values={values} />
      </div>
    </div>
        </div>  
    );
};

export default UserDashboard;