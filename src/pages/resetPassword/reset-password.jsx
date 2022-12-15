import React, { useState, useCallback } from "react";
import resetPassword from "./reset-password.module.css";
import {
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../utils/burger-api";
import axios from "axios";

export function ResetPassword() {
  const userStore = useSelector((store) => store.userDataReducer);
  const isUserAuthorized = userStore.accessToken !== "";

  const history = useHistory();

  const [userData, setUserData] = useState({
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

  function handleSubmit(event) {
    event.preventDefault();

    const data = JSON.stringify(userData);

    const resetPassword = {
      method: "post",
      url: `${BASE_URL}/password-reset/reset`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(resetPassword)
      .then(function (response) {
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
      <form className={resetPassword.container} onSubmit={handleSubmit}>
        <h2 className={resetPassword.header}>Восстановление пароля</h2>

        <PasswordInput
          onChange={onChange}
          value={userData.password}
          name={"password"}
          placeholder={"Введите новый пароль"}
        />

        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={onChange}
          value={userData.token}
          name={"token"}
          size={"default"}
        />
        <button
          className={resetPassword.button}
          type="submit"
          disabled={userData.email === "" ? true : false}
        >
          Сохранить
        </button>
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
