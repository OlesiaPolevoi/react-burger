import React, { useState, useCallback, Dispatch } from "react";
import register from "./register.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { userRegisterRequest } from "../../services/actions/user-data";
import { TCombinedReducer } from "../../types";
import { useAppDispatch } from "../../services/hooks";

export function Register() {
  const userStore = useSelector(
    (store: TCombinedReducer) => store.userDataReducer
  );
  const isUserAuthorized = userStore.accessToken !== "";
  const dispatch: Dispatch<any> = useAppDispatch();
  const history = useHistory();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => {
      return { ...prevUserData, [name]: value };
    });
  };

  const goToLogin = useCallback(() => {
    history.replace({ pathname: "/login" });
  }, [history]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
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
      <form className={register.container} onSubmit={handleSubmit}>
        <h2 className={register.header}>Register</h2>

        <Input
          type={"text"}
          placeholder={"Name"}
          onChange={onChange}
          value={userData.name}
          name={"name"}
          error={false}
          errorText={"Error"}
          size={"default"}
        />

        <EmailInput
          onChange={onChange}
          value={userData.email}
          name={"email"}
          isIcon={false}
          placeholder={"E-mail"}
        />

        <PasswordInput
          onChange={onChange}
          value={userData.password}
          name={"password"}
          extraClass="mb-2"
          placeholder={"Password"}
        />
        <button className={register.button} type="submit">
          Register
        </button>
      </form>

      <div className={register.info}>
        <h4>Already registered?</h4>
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          onClick={goToLogin}
        >
          Login
        </Button>
      </div>
    </div>
  );
}
