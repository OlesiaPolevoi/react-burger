import React, { useState, useCallback } from "react";
import resetPassword from "./reset-password.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
  ShowIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory } from "react-router-dom";

export function ResetPassword() {
  const history = useHistory();

  //const [value, setValue] = React.useState("");
  const [userData, setUserData] = React.useState({
    password: "",
    password1: "",

    code: "",
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
    // NOTE submitToApi(userData)
    // console.log(userData);
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
          value={userData.code}
          name={"code"}
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
