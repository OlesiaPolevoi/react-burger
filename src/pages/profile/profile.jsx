import React, { useState } from "react";
import profile from "./profile.module.css";
import { Link } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
  EditIcon,
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function Profile() {
  //const [value, setValue] = React.useState("");
  const [userData, setUserData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  // const [currentTab, setCurrentTab] = React.useState("one");

  const onChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => {
      return { ...prevUserData, [name]: value };
    });
  };
  const inputRef = React.useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
  };
  function handleSubmit() {
    // NOTE submitToApi(userData)
    console.log(userData);
  }

  return (
    <div className={profile.wrapper}>
      <div>
        <div
          className={profile.tabs}
          // style={{
          //   display: "flex",
          //   flexDirection: "column",
          //   marginBottom: "80px",
          // }}
        >
          <Link to="/profile" className={profile.tab}>
            Профиль
          </Link>
          <Link to="/profile/orders" className={profile.tabInactive}>
            {" "}
            История заказов
          </Link>
          <Link to="/profile/orders/:id" className={profile.tabInactive}>
            Выход
          </Link>

          {/* <Tab
            value="one"
            active={currentTab === "one"}
            onClick={setCurrentTab}
          >
            Профиль
          </Tab>
          <Tab
            value="two"
            active={currentTab === "two"}
            onClick={setCurrentTab}
          >
            История заказов
          </Tab>
          <Tab
            value="three"
            active={currentTab === "three"}
            onClick={setCurrentTab}
          >
            Выход
          </Tab> */}
        </div>
        <p className={profile.paragraph}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>

      <form className={profile.container}>
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
          icon={"EditIcon"}
          onIconClick={onIconClick}
          ref={inputRef}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <EmailInput
            onChange={onChange}
            value={userData.email}
            name={"email"}
            placeholder="Логин"
            isIcon={true}
            //extraClass="mb-2"
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <PasswordInput
            onChange={onChange}
            value={userData.password}
            name={"password"}
            icon="EditIcon"
          />
        </div>

        <div className={profile.buttons}>
          <Button htmlType="button" type="secondary" size="medium">
            Отмена
          </Button>
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
        </div>
      </form>
    </div>
  );
}

// () => {
//   const [currentTab, setCurrentTab] = React.useState('one')
//   return (
//     <div style={{ display: 'flex', flexDirection: "column" }}>
//       <Tab value="one" active={currentTab === 'one'} onClick={setCurrentTab}>
//         One
//       </Tab>
//       <Tab value="two" active={currentTab === 'two'} onClick={setCurrentTab}>
//         Two
//       </Tab>
//       <Tab value="three" active={currentTab === 'three'} onClick={setCurrentTab}>
//         Three
//       </Tab>
//     </div>
//   )
// }
