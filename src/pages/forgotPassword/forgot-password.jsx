import React, { useState, useCallback } from "react";
import forgotPassword from "./forgot-password.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory, Redirect } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

export function ForgotPassword() {
  const userStore = useSelector((store) => store.userDataReducer);
  const isUserAuthorized = userStore.accessToken !== ""; //true

  const history = useHistory();

  //const [value, setValue] = React.useState("");
  const [userData, setUserData] = React.useState({
    email: "",
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
    // NOTE submitToApi(userData)

    //var axios = require("axios");

    const getEmailCode = {
      method: "post",
      url: "https://norma.nomoreparties.space/api/password-reset",
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };

    axios(getEmailCode)
      .then(function (response) {
        console.log(JSON.stringify(response.data));

        history.push("/reset-password", { from: "forgot-password" });
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
  return (
    <div>
      <form className={forgotPassword.container}>
        <h2 className={forgotPassword.header}>Восстановление пароля</h2>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <EmailInput
            onChange={onChange}
            value={userData.email}
            name={"email"}
            isIcon={false}
            placeholder={"Укажите e-mail"}
          />
        </div>

        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={() => {
            handleSubmit();
          }}
          disabled={userData.email === "" ? true : false}
        >
          Восстановить
        </Button>
      </form>

      <div className={forgotPassword.info}>
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
