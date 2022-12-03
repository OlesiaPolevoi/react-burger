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
  // console.log("referrer", window.document.referrer);
  const userStore = useSelector((store) => store.userDataReducer);
  const isUserAuthorized = userStore.accessToken !== ""; //true

  const history = useHistory();
  //NOTE NOTE
  // console.log(
  //   "history.location.state.from",
  //   history.location.state.from === "forgot-password"
  // );

  //const [value, setValue] = React.useState("");
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

    // NOTE submitToApi(userData)
    // console.log(userData);
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

  if (history?.location?.state?.from !== "forgot-password") {
    return (
      // Переадресовываем авторизованного пользователя на главную страницу
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
            //  extraClass="mb-2"
          />
        </div>

        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={onChange}
          //onChange={(e) => setValue(e.target.value)}
          // icon={"CurrencyIcon"}
          value={userData.token}
          name={"token"}
          //error={false}
          //ref={inputRef}
          // onIconClick={onIconClick}
          //errorText={"Ошибка"}
          size={"default"}
          //extraClass="ml-1"
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
