import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister(userData);
  };

  return (
    <section className="authorization">
      <div className="authorization__container">
        <h2 className="authorization__title">Регистрация</h2>
        <form className="authorization__form" onSubmit={handleSubmit}>
          <input
            className="authorization__info"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={userData.email}
            required
            onChange={handleChange}
          />
          <input
            className="authorization__info"
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            value={userData.password}
            required
            onChange={handleChange}
          />
          <button className="authorization__button button" type="submit">
            Зарегистрироваться
          </button>
          <Link className="authorization__text" to="/sign-in">
            Уже зарегистрированы? Войти
          </Link>
        </form>
      </div>
    </section>
  );
}

export default Register;
