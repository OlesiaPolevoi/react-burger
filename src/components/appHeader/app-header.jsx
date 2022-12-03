import appHeader from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { Link, useRouteMatch } from "react-router-dom";

export function AppHeader() {
  const isConstructor = !!useRouteMatch({ path: "/", exact: true });
  const isCurrentOrders = !!useRouteMatch("/current-orders");
  const isProfile = !!useRouteMatch("/profile");

  return (
    <header className={appHeader.header}>
      <nav className={appHeader.container}>
        <div className={appHeader.elements}>
          <NavigationLink
            text="Конструктор"
            icon={
              isConstructor ? (
                <BurgerIcon type="primary" />
              ) : (
                <BurgerIcon type="secondary" />
              )
            }
            inactive={isConstructor ? false : true}
            path="/"
          />

          <NavigationLink
            text="Лента заказов"
            icon={
              isCurrentOrders ? (
                <ListIcon type="primary" />
              ) : (
                <ListIcon type="secondary" />
              )
            }
            inactive={isCurrentOrders ? false : true}
            path="/current-orders"
          />
        </div>
        <Logo />

        <NavigationLink
          text="Личный кабинет"
          icon={
            isProfile ? (
              <ProfileIcon type="primary" />
            ) : (
              <ProfileIcon type="secondary" />
            )
          }
          inactive={isProfile ? false : true}
          //inactive={!isProfile}
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
