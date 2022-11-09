import React from "react";
import appHeader from './app-header.module.css';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";


export function AppHeader() {
  return (
    <header className={appHeader.header}>
      <nav className={appHeader.container}>
        <div className={appHeader.elements}>
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
    
      <a href="#" className={`${appHeader.link} ${inactive ? appHeader.inactive : ""}`}>
        {icon}
        <span className={appHeader.text}>{text}</span>
      </a>
   
  );
}

NavigationLink.propTypes = {
  text: PropTypes.string.isRequired,
  inactive: PropTypes.bool,
  icon: PropTypes.object.isRequired
};

