import React, { useState, useCallback } from "react";
import login from "./login.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLoginRequest } from "../../services/actions/user-data";
import { Redirect } from "react-router-dom";

export function Login() {
  const userStore = useSelector((store) => store.userDataReducer);
  const isUserAuthorized = userStore.accessToken !== ""; //true

  const history = useHistory();

  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
  });

  // //NOTE NOTE - need this? - uncomment?
  // const userData1 = useSelector((store) => store.userDataReducer);
  // //  console.log("current STATE LOGIN- ", userData1);
  const dispatch = useDispatch();

  const onChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => {
      return { ...prevUserData, [name]: value };
    });
  };

  const goToRegister = useCallback(() => {
    history.replace({ pathname: "/register" });
  }, [history]);

  const goToForgotPassword = useCallback(() => {
    history.replace({ pathname: "/forgot-password" });
  }, [history]);

  //goToForgotPassword
  function handleSubmit() {
    // dispatch(
    //   submitOrderAndGetId(ingredientsArrayCopy, () => setModalIsOpen(true))
    // )
    //NOTE history?

    dispatch(
      userLoginRequest(userData, () =>
        history.replace({ pathname: "/profile" })
      )
    );
  }

  if (isUserAuthorized) {
    return (
      // Переадресовываем авторизованного пользователя на главную страницу
      <Redirect
        to={{
          pathname: "/profile",
        }}
      />
    );
  }
  return (
    <div>
      <form className={login.container}>
        <h2 className={login.header}>Вход</h2>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <EmailInput
            onChange={onChange}
            value={userData.email}
            name={"email"}
            isIcon={false}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <PasswordInput
            onChange={onChange}
            value={userData.password}
            name={"password"}
            extraClass="mb-2"
          />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={() => {
            handleSubmit();
          }}
        >
          Войти
        </Button>
      </form>

      <div className={login.info}>
        <h4>Вы — новый пользователь?</h4>
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          onClick={goToRegister}
        >
          Зарегистрироваться
        </Button>
      </div>
      <div className={login.info}>
        <h4>Забыли пароль?</h4>
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          onClick={goToForgotPassword}
        >
          Восстановить пароль
        </Button>
      </div>
    </div>
  );
}
