// src/pages/ValueSelection.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/auth';

const ValueSelection = () => {
    const [values, setValues] = useState([]);
    const [selectedValues, setSelectedValues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchValues = async () => {
            try {
                const response = await api.get('/values/');
                setValues(response.data);
            } catch (err) {
                setError('Ошибка загрузки ценностей');
            } finally {
                setLoading(false);
            }
        };
        fetchValues();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/user/values/', {
                values: selectedValues
            });
            navigate('/dashboard');
        } catch (err) {
            setError('Ошибка сохранения ценностей');
        }
    };

    const handleCheckboxChange = (valueId) => {
        setSelectedValues(prev => 
            prev.includes(valueId) 
                ? prev.filter(id => id !== valueId) 
                : [...prev, valueId]
        );
    };

    if (loading) return <div>Загрузка...</div>;

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Выберите свои ценности</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {values.map(value => (
                        <label 
                            key={value.id}
                            className={`p-4 rounded-lg border-2 cursor-pointer transition-colors
                                ${selectedValues.includes(value.id) 
                                    ? 'border-blue-500 bg-blue-50' 
                                    : 'border-gray-200 hover:border-blue-300'}`}
                        >
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={selectedValues.includes(value.id)}
                                onChange={() => handleCheckboxChange(value.id)}
                            />
                            <div className="flex items-center">
                                <span className="text-lg font-medium">{value.name}</span>
                            </div>
                        </label>
                    ))}
                </div>
                
                {error && <p className="text-red-500 mt-4">{error}</p>}
                
                <button
                    type="submit"
                    disabled={selectedValues.length === 0}
                    className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg
                        hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    Сохранить и продолжить
                </button>
            </form>
        </div>
    );
};

export default ValueSelection;