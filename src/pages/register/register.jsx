import React, { useState, useCallback } from "react";
import register from "./register.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userRegisterRequest } from "../../services/actions/user-data";

export function Register() {
  const userStore = useSelector((store) => store.userDataReducer);
  const isUserAuthorized = userStore.accessToken !== "";
  const dispatch = useDispatch();
  const history = useHistory();
  const [userData, setUserData] = useState({
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
    dispatch(
      userRegisterRequest(userData, () =>
        history.replace({ pathname: "/profile" })
      )
    );
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
      <form className={register.container}>
        <h2 className={register.header}>Регистрация</h2>

        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChange}
          value={userData.name}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />

        <EmailInput
          onChange={onChange}
          value={userData.email}
          name={"email"}
          isIcon={false}
        />

        <PasswordInput
          onChange={onChange}
          value={userData.password}
          name={"password"}
          extraClass="mb-2"
        />

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
