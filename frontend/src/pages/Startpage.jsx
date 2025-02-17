import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Startpage.css";

export default function Startpage() {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // Анимация появления блоков с прогрессом
    const progressBar = document.querySelector(".progress-bar");
    if (isChecked) {
      progressBar.classList.add("active");
    }
  }, [isChecked]);

  useEffect(() => {
    // Добавляем анимацию появления блоков с преимуществами при прокрутке
    const features = document.querySelectorAll('.feature');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.5 }); // Запускать, когда элемент будет виден на 50%

    features.forEach(feature => {
      observer.observe(feature);
    });

    // Очистка observer при размонтировании компонента
    return () => {
      features.forEach(feature => {
        observer.unobserve(feature);
      });
    };
  }, []);

  return (
    <div className="startpage">
      {/* Фиксированное меню */}
      <div className="fixed-buttons">
        <Link to="/register" className="btn primary">Начать</Link>
        <Link to="/login" className="btn secondary">Войти</Link>
      </div>

      {/* Первый экран */}
      <section className="hero">
        <h1>SEIN – Достигай целей, живи осознанно</h1>
        <p>Создавайте цели, следите за прогрессом и находите смысл в каждом дне.</p>
      </section>

      {/* Блоки с преимуществами */}
      <section className="features">
        <div className="feature">
          <h2>🔹 Определи свои ценности</h2>
          <p>Выберите, что важно именно вам, и создавайте цели, которые имеют смысл.</p>
        </div>
        <div className="feature">
          <h2>🔹 Следите за прогрессом</h2>
          <p>Наш инструмент поможет вам отслеживать, насколько вы приближаетесь к своим ценностям.</p>
        </div>
        <div className="feature">
          <h2>🔹 Персонаж-помощник</h2>
          <p>В будущем вас будет сопровождать персональный помощник, который мотивирует и поддерживает.</p>
        </div>
      </section>

      {/* Карточка с целью и прогрессом */}
      <section className="goal-card">
        <div className="card">
          <div className="card-content">
            <h3>Пример первой цели: Просмотреть этот пост</h3>
            <p>Ценность: <strong>Развитие</strong></p>
            <p>Дедлайн: <strong>Сейчас</strong></p>
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="goal-checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
              <label htmlFor="goal-checkbox">Я выполнил(а) цель</label>
            </div>
          </div>

          {/* Прогресс бар */}
          <div className="progress-container">
            <div className={`progress-bar ${isChecked ? "active" : ""}`}></div>
          </div>
        </div>
      </section>

      {/* Призыв к действию */}
      <section className="cta">
        <h2>Готовы начать?</h2>
        <p>Присоединяйтесь и начните движение к лучшей версии себя уже сегодня!</p>
        <Link to="/register" className="btn primary">Создать аккаунт</Link>
      </section>
    </div>
  );
}


