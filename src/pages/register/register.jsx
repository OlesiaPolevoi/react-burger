import React, { useState, useCallback } from "react";
import register from "./register.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory, Redirect } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { userRegisterRequest } from "../../services/actions/user-data";

export function Register() {
  const userStore = useSelector((store) => store.userDataReducer);
  const isUserAuthorized = userStore.accessToken !== ""; //true

  // const userData1 = useSelector((store) => store.userDataReducer);
  // console.log("current STATE - ", userData1);
  const dispatch = useDispatch();
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
    // console.log(userData);

    dispatch(
      userRegisterRequest(userData, () =>
        history.replace({ pathname: "/profile" })
      )
    );

    // const data = JSON.stringify(userData);

    // const registerUser = {
    //   method: "post",
    //   url: "https://norma.nomoreparties.space/api/auth/register",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: data,
    // };

    // axios(registerUser)
    //   .then(function (response) {
    //     console.log(JSON.stringify(response.data));
    //     history.replace({ pathname: "/profile" });
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
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
