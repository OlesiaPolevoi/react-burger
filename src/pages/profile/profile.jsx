import React, { useState, useEffect } from "react";
import profile from "./profile.module.css";
import { Link, useRouteMatch } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import {
  profileInfoRequest,
  profileInfoUpdate,
  userExitRequest,
} from "../../services/actions/profile-data";
import { getRefreshToken } from "../../utils/local-storage";

export function Profile() {
  const refreshToken = getRefreshToken();

  const isProfile = !!useRouteMatch({ path: "/profile", exact: true });
  const isOrderHistory = !!useRouteMatch("/profile/orders");
  const isExit = !!useRouteMatch("/profile/exit");
  const userInfo = useSelector((store) => store.userDataReducer);

  const [userData, setUserData] = useState({
    name: `${userInfo.name}`,
    email: `${userInfo.email}`,
    password: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(profileInfoRequest());
  }, []);

  useEffect(() => {
    if (!userInfo.loading) {
      setUserData({
        name: userInfo.name,
        email: userInfo.email,
        password: "",
      });
    }
  }, [userInfo]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => {
      return { ...prevUserData, [name]: value };
    });
  };
  const inputRef = React.useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
  };

  function submitProfileChanges() {
    dispatch(profileInfoUpdate(userData));
  }

  const toPreviousInput = () => {
    setUserData({
      name: `${userInfo.name}`,
      email: `${userInfo.email}`,
      password: "",
    });
  };

  const userLogout = (refreshToken) => {
    dispatch(userExitRequest(refreshToken));
  };
  return (
    <div className={profile.wrapper}>
      <div>
        <div className={profile.tabs}>
          <Link
            to="/profile"
            className={isProfile ? profile.tab : profile.tabInactive}
          >
            Профиль
          </Link>
          <Link
            to="/profile/orders"
            className={isOrderHistory ? profile.tab : profile.tabInactive}
          >
            История заказов
          </Link>
          <Link
            to="/profile/exit"
            className={isExit ? profile.tab : profile.tabInactive}
            onClick={() => {
              userLogout(refreshToken);
            }}
          >
            Выход
          </Link>
        </div>
        <p className={profile.paragraph}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>

      <form className={profile.container}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChange}
          value={userData.name}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          icon={"EditIcon"}
          onIconClick={onIconClick}
          ref={inputRef}
        />

        <EmailInput
          onChange={onChange}
          value={userData.email}
          name={"email"}
          placeholder="Логин"
          isIcon={true}
        />

        <PasswordInput
          onChange={onChange}
          value={userData.password}
          name={"password"}
          icon="EditIcon"
        />

        <div className={profile.buttons}>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={() => {
              toPreviousInput();
            }}
          >
            Отмена
          </Button>
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            onClick={() => {
              submitProfileChanges();
            }}
          >
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
}
