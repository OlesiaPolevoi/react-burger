import React, { useState, useCallback } from "react";
import login from "./login.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useHistory } from "react-router-dom";

export function Login() {
  const history = useHistory();

  //const [value, setValue] = React.useState("");
  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
  });

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
    // NOTE submitToApi(userData)
    console.log(userData);
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
