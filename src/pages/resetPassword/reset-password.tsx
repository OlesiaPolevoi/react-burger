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
import { TCombinedReducer } from "../../types";

interface LocationState {
  replace: (obj: { pathname: string }) => void;
  location: {
    state: {
      from: string;
    };
  };
}
export function ResetPassword() {
  const userStore = useSelector(
    (store: TCombinedReducer) => store.userDataReducer
  );

  const isUserAuthorized = userStore.accessToken !== "";

  const history: LocationState = useHistory();

  const [userData, setUserData] = useState({
    password: "",
    token: "",
    email: "",
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
        <h2 className={resetPassword.header}>Password reset</h2>

        <PasswordInput
          onChange={onChange}
          value={userData.password}
          name={"password"}
          placeholder={"Enter new password"}
        />

        <Input
          type={"text"}
          placeholder={"Enter code from email"}
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
          Save
        </button>
      </form>

      <div className={resetPassword.info}>
        <h4>Remembered password?</h4>
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
