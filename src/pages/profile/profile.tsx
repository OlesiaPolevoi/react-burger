import React, { useState, useEffect, Dispatch } from "react";
import profile from "./profile.module.css";
import { Link, useRouteMatch } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import {
  profileInfoRequest,
  profileInfoUpdate,
  userExitRequest,
} from "../../services/actions/profile-data";
import { getRefreshToken } from "../../utils/local-storage";
import { TCombinedReducer } from "../../types";

// export const ordersData: any = [
//   {
//     _id: "63bf2d1008634b001c9b6674",
//     ingredients: [
//       "60d3b41abdacab0026a733c7",
//       "60d3b41abdacab0026a733cd",
//       "60d3b41abdacab0026a733cc",
//       "60d3b41abdacab0026a733cf",
//       "60d3b41abdacab0026a733c7",
//     ],
//     status: "done",
//     name: "Space spicy флюоресцентный антарианский бургер",
//     createdAt: "2023-01-11T21:41:36.099Z",
//     updatedAt: "2023-01-11T21:41:36.506Z",
//     number: 36805,
//   },
//   {
//     _id: "63bf2c2608634b001c9b6670",
//     ingredients: [
//       "60d3b41abdacab0026a733c7",
//       "60d3b41abdacab0026a733cd",
//       "60d3b41abdacab0026a733cb",
//       "60d3b41abdacab0026a733d1",
//       "60d3b41abdacab0026a733d0",
//       "60d3b41abdacab0026a733d4",
//       "60d3b41abdacab0026a733c7",
//     ],
//     status: "done",
//     name: "Фалленианский флюоресцентный минеральный астероидный space био-марсианский бургер",
//     createdAt: "2023-01-11T21:37:42.788Z",
//     updatedAt: "2023-01-11T21:37:43.215Z",
//     number: 36804,
//   },
//   {
//     _id: "63bf26a908634b001c9b665b",
//     ingredients: [
//       "60d3b41abdacab0026a733c6",
//       "60d3b41abdacab0026a733cc",
//       "60d3b41abdacab0026a733c6",
//     ],
//     status: "done",
//     name: "Spicy краторный бургер",
//     createdAt: "2023-01-11T21:14:17.463Z",
//     updatedAt: "2023-01-11T21:14:17.941Z",
//     number: 36803,
//   },
//   {
//     _id: "63bf20fa08634b001c9b662f",
//     ingredients: [
//       "60d3b41abdacab0026a733c7",
//       "60d3b41abdacab0026a733cd",
//       "60d3b41abdacab0026a733c7",
//     ],
//     status: "done",
//     name: "Space флюоресцентный бургер",
//     createdAt: "2023-01-11T20:50:02.820Z",
//     updatedAt: "2023-01-11T20:50:03.249Z",
//     number: 36802,
//   },
// ];

export const ordersData: any = {
  success: true,
  orders: [
    {
      ingredients: ["60d3463f7034a000269f45e9", "60d3463f7034a000269f45e7"],
      _id: "",
      status: "done",
      number: 1,
      createdAt: "2021-06-23T20:11:01.403Z",
      updatedAt: "2021-06-23T20:11:01.406Z",
    },
    {
      ingredients: ["60d3463f7034a000269f45e9"],
      _id: "",
      status: "done",
      number: 3,
      createdAt: "2021-06-23T20:13:23.654Z",
      updatedAt: "2021-06-23T20:13:23.657Z",
    },
  ],
  total: 2,
  totalToday: 2,
};

export function Profile() {
  const refreshToken = getRefreshToken() as string;

  const isProfile = !!useRouteMatch({ path: "/profile", exact: true });
  const isOrderHistory = !!useRouteMatch("/profile/orders");
  const isExit = !!useRouteMatch("/profile/exit");
  const userInfo = useSelector(
    (store: TCombinedReducer) => store.userDataReducer
  );

  const [userData, setUserData] = useState({
    name: `${userInfo.name}`,
    email: `${userInfo.email}`,
    password: "",
  });
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    dispatch(profileInfoRequest());
  }, []);

  useEffect(() => {
    if (!userInfo.loading) {
      setUserData({
        name: userInfo.name,
        email: userInfo.email,
        password: "",
      });
    }
  }, [userInfo]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => {
      return { ...prevUserData, [name]: value };
    });
  };
  const inputRef = React.useRef<HTMLInputElement>(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  function submitProfileChanges(event: React.FormEvent) {
    event.preventDefault();
    dispatch(profileInfoUpdate(userData));
  }

  const toPreviousInput = () => {
    setUserData({
      name: `${userInfo.name}`,
      email: `${userInfo.email}`,
      password: "",
    });
  };

  const userLogout = (refreshToken: string) => {
    dispatch(userExitRequest(refreshToken));
  };
  return (
    <div className={profile.wrapper}>
      <div>
        <div className={profile.tabs}>
          <Link
            to="/profile"
            className={isProfile ? profile.tab : profile.tabInactive}
          >
            Профиль
          </Link>
          <Link
            to="/profile/orders"
            className={isOrderHistory ? profile.tab : profile.tabInactive}
          >
            История заказов
          </Link>
          <Link
            to="/profile/exit"
            className={isExit ? profile.tab : profile.tabInactive}
            onClick={() => {
              userLogout(refreshToken);
            }}
          >
            Выход
          </Link>
        </div>
        <p className={profile.paragraph}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>

      {isProfile && (
        <form className={profile.container} onSubmit={submitProfileChanges}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={onChange}
            value={userData.name}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            icon={"EditIcon"}
            onIconClick={onIconClick}
            ref={inputRef}
          />

          <EmailInput
            onChange={onChange}
            value={userData.email}
            name={"email"}
            placeholder="Логин"
            isIcon={true}
          />

          <PasswordInput
            onChange={onChange}
            value={userData.password}
            name={"password"}
            icon="EditIcon"
          />

          <div className={profile.buttons}>
            <Button
              htmlType="button"
              type="secondary"
              size="medium"
              onClick={() => {
                toPreviousInput();
              }}
            >
              Отмена
            </Button>
            <button className={profile.button} type="submit">
              Сохранить
            </button>
          </div>
        </form>
      )}

      {isOrderHistory && (
        <div className={profile.orderswrapper}>
          <ProfileOrder />
          <ProfileOrder />
          <ProfileOrder />
          <ProfileOrder />
          <ProfileOrder />
        </div>
      )}
    </div>
  );
}

export function ProfileOrder() {
  return (
    <div className={profile.ordercontainer}>
      <div className={profile.ordernumbercontainer}>
        <div className={profile.ordernumber}>#123456</div>
        <div>Сегодня, 16:20 i-GMT+3</div>
      </div>

      <div className={profile.burgertitle}>Death Star Starship Main бургер</div>
      <div className={profile.status}>Создан</div>
      <div className={profile.imgpricecontainer}>
        <div>
          <img
            className={profile.imgicon}
            src="https://code.s3.yandex.net/react/code/bun-02.png"
            alt="some description"
          />
          <img
            className={profile.imgicon}
            src="https://code.s3.yandex.net/react/code/sauce-04.png"
            alt="some description"
          />
          <img
            className={profile.imgicon}
            src="https://code.s3.yandex.net/react/code/meat-01.png"
            alt="some description"
          />
        </div>
        <div className={profile.pricecontainer}>
          <div className={profile.price}>123</div>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}
