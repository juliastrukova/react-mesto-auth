import React from "react";
import { Link, Route } from "react-router-dom";
import logo from "../images/header/__logo.svg";

function Header({ loggedIn, userEmail, onSignOut }) {
  return (
    <header className="header">
      <img src={logo} alt="логотип" className="header__logo" />
      {!loggedIn && (
        <>
          {
            <Route path="/sign-up">
              <Link to="/sign-in" className="header__link">
                Войти
              </Link>
            </Route>
          }
          {
            <Route path="/sign-in">
              <Link to="/sign-up" className="header__link">
                Регистрация
              </Link>
            </Route>
          }
        </>
      )}
      {loggedIn && (
        <div className="header__menu">
          <p className="header__email">{userEmail}</p>
          <a className="header__logout" onClick={onSignOut}>
            Выйти
          </a>
        </div>
      )}
    </header>
  );
}

export default Header;
