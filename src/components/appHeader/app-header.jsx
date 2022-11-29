import appHeader from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export function AppHeader() {
  return (
    <header className={appHeader.header}>
      <nav className={appHeader.container}>
        <div className={appHeader.elements}>
          <NavigationLink
            text="Конструктор"
            icon={<BurgerIcon type="primary" className="nav-icon" />}
            path="/"
          />

          <NavigationLink
            text="Лента заказов"
            icon={<ListIcon type="secondary" />}
            inactive={true}
            path="/current-orders"
          />
        </div>
        <Logo />

        <NavigationLink
          text="Личный кабинет"
          icon={<ProfileIcon type="secondary" />}
          inactive={true}
          path="/profile"
        />
      </nav>
    </header>
  );
}

function NavigationLink({ text, icon, inactive, path }) {
  //NOTE or Navlink here - to highlight active class??
  return (
    <Link
      to={`${path}`}
      // href="#"

      className={`${appHeader.link} ${inactive ? appHeader.inactive : ""}`}
    >
      {icon}
      <span className={appHeader.text}>{text}</span>
    </Link>
  );
}

NavigationLink.propTypes = {
  text: PropTypes.string.isRequired,
  inactive: PropTypes.bool,
  icon: PropTypes.object.isRequired,
};
