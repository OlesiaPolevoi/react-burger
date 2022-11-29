import React, { useState } from "react";
import login from "./login.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function Login() {
  //const [value, setValue] = React.useState("");
  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => {
      return { ...prevUserData, [name]: value };
    });
  };
  function handleSubmit() {
    // NOTE submitToApi(userData)
    console.log(userData);
  }

  return (
    <div>
      <form className={login.container}>
        <h2 className={login.header}>Вход</h2>

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
          Войти
        </Button>
      </form>

      <div>
        <h4>Вы — новый пользователь?</h4>
        <Button htmlType="button" type="secondary" size="medium">
          Зарегистрироваться
        </Button>
      </div>
      <div>
        <h4>Забыли пароль?</h4>
        <Button htmlType="button" type="secondary" size="medium">
          Восстановить пароль
        </Button>
      </div>
    </div>
  );
}
// () => {
//   const [value, setValue] = React.useState("password");
//   const onChange = (e) => {
//     setValue(e.target.value);
//   };
//   return (
// <div style={{ display: "flex", flexDirection: "column" }}>
//   <PasswordInput
//     onChange={onChange}
//     value={value}
//     name={"password"}
//     extraClass="mb-2"
//   />
//   <PasswordInput
//     onChange={onChange}
//     value={value}
//     name={"password"}
//     icon="EditIcon"
//   />
// </div>
//   );
// };

// <EmailInput
// onChange={onChange}
// value={value}
// name={"email"}
// placeholder="Логин"
// isIcon={true}
// extraClass="mb-2"
// />
