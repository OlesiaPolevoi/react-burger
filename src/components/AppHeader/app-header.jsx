import React from "react";
import "./app-header.css";

import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export default function AppHeader() {
  return (
    <header className="app-header">
      <nav>
        <div className="nav-elements">
          <a href="#" className="nav-link">
            <BurgerIcon type="primary" className="nav-icon" />
            <span className="nav-text">Конструктор</span>
          </a>

          <a href="#" className="nav-link nav-inactive">
            <ListIcon type="secondary" />
            <span className="nav-text"> Лента заказов</span>
          </a>
        </div>
        <Logo />

        <a href="#" className="nav-link nav-inactive">
          <ProfileIcon type="secondary" />
          <span className="nav-text"> Личный кабинет</span>
        </a>
      </nav>
    </header>
  );
}
