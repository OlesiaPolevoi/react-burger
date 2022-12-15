import appHeader from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { Link, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";

export function AppHeader() {
  const userInfo = useSelector((store) => store.userDataReducer);
  const isUserAuthorized = userInfo.name !== "";

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
        <Link to="/">
          <Logo />
        </Link>
        <NavigationLink
          text={isUserAuthorized ? userInfo?.name : "Личный кабинет"}
          icon={
            isProfile ? (
              <ProfileIcon type="primary" />
            ) : (
              <ProfileIcon type="secondary" />
            )
          }
          inactive={isProfile ? false : true}
          path="/profile"
        />
      </nav>
    </header>
  );
}

function NavigationLink({ text, icon, inactive, path }) {
  return (
    <Link
      to={`${path}`}
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
