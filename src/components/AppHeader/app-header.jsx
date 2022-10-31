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
          <NavigationLink
            text="Конструктор"
            icon={<BurgerIcon type="primary" className="nav-icon" />}
          />

          <NavigationLink
            text="Лента заказов"
            icon={<ListIcon type="secondary" />}
            inactive={true}
          />
        </div>
        <Logo />

        <NavigationLink
          text="Личный кабинет"
          icon={<ProfileIcon type="secondary" />}
          inactive={true}
        />
      </nav>
    </header>
  );
}

function NavigationLink({ text, icon, inactive }) {
  return (
    <>
      <a href="#" className={`nav-link ${inactive ? "nav-inactive" : ""}`}>
        {icon}
        <span className="nav-text">{text}</span>
      </a>
    </>
  );
}