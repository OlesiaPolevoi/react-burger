import React, { useState, useCallback } from "react";
import resetPassword from "./reset-password.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
  ShowIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";

export function ResetPassword() {
  const userStore = useSelector((store) => store.userDataReducer);
  const isUserAuthorized = userStore.accessToken !== ""; //true

  const history = useHistory();

  const [userData, setUserData] = React.useState({
    password: "",
    token: "",
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => {
      return { ...prevUserData, [name]: value };
    });
  };
  const goToLogin = useCallback(() => {
    history.replace({ pathname: "/login" });
  }, [history]);

  function handleSubmit() {
    const data = JSON.stringify(userData);

    const resetPassword = {
      method: "post",
      url: "https://norma.nomoreparties.space/api/password-reset/reset",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(resetPassword)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        history.replace({ pathname: "/login" });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  if (isUserAuthorized) {
    return (
      <Redirect
        to={{
          pathname: "/profile",
        }}
      />
    );
  }

  if (history?.location?.state?.from !== "forgot-password") {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }
  return (
    <div>
      <form className={resetPassword.container}>
        <h2 className={resetPassword.header}>Восстановление пароля</h2>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <PasswordInput
            onChange={onChange}
            value={userData.password}
            name={"password"}
            placeholder={"Введите новый пароль"}
          />
        </div>

        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={onChange}
          value={userData.token}
          name={"token"}
          size={"default"}
        />

        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={() => {
            handleSubmit();
          }}
        >
          Сохранить
        </Button>
      </form>

      <div className={resetPassword.info}>
        <h4>Вспомнили пароль?</h4>
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          onClick={goToLogin}
        >
          Войти
        </Button>
      </div>
    </div>
  );
}
