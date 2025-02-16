// src/pages/ValueSelection.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/auth';

import '../styles/ValueSelectStyles.css'; // Подключаем стили

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
            await api.post('/user/values/', { values: selectedValues });
            navigate('/dashboard');
        } catch (err) {
            setError('Ошибка сохранения ценностей');
        }
    };

    const handleCheckboxChange = (valueId) => {
        setSelectedValues((prev) =>
            prev.includes(valueId)
                ? prev.filter((id) => id !== valueId)
                : [...prev, valueId]
        );
    };

    if (loading) return <div className="value-selection-container">Загрузка...</div>;

    return (
    
        <div className="value-selection-container">
            <h2 className="value-selection-title">Выберите свои ценности</h2>
            <form onSubmit={handleSubmit}>
                <div className="value-list">
                    {values.map((value) => (
                        <label
                            key={value.id}
                            className={`value-item ${selectedValues.includes(value.id) ? 'selected' : ''}`}
                        >
                            <input
                                type="checkbox"
                                className="value-checkbox"
                                checked={selectedValues.includes(value.id)}
                                onChange={() => handleCheckboxChange(value.id)}
                            />
                            <span className="value-text">{value.name}</span>
                        </label>
                    ))}
                </div>

                {error && <p className="value-error">{error}</p>}

                <button
                    type="submit"
                    disabled={selectedValues.length === 0}
                    className="value-submit"
                >
                    Сохранить и продолжить
                </button>
            </form>
        </div>
    );
};

export default ValueSelection;
