import React, { useState, useCallback } from "react";
import register from "./register.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory } from "react-router-dom";

export function Register() {
  //const [value, setValue] = React.useState("");
  const history = useHistory();
  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
    name: "",
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
    //console.log(userData);
  }

  return (
    <div>
      <form className={register.container}>
        <h2 className={register.header}>Регистрация</h2>

        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChange}
          value={userData.name}
          name={"name"}
          error={false}
          //ref={inputRef}
          errorText={"Ошибка"}
          size={"default"}
          // extraClass="ml-1"
        />

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
          Зарегистрироваться
        </Button>
      </form>

      <div className={register.info}>
        <h4>Уже зарегистрированы?</h4>
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
