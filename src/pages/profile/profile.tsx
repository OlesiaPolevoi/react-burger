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
import { getAccessToken } from "../../utils/local-storage";

export const ordersData: any = {
  success: true,
  orders: [
    {
      ingredients: ["60d3b41abdacab0026a733c6", "60d3b41abdacab0026a733ca"],
      _id: "63c18e3b936b17001be4dae9",
      status: "done",
      number: 1,
      name: "Space spicy флюоресцентный антарианский бургер",
      createdAt: "2021-06-23T20:11:01.403Z",
      updatedAt: "2021-06-23T20:11:01.406Z",
    },
    {
      ingredients: [
        "60d3b41abdacab0026a733ca",
        "60d3b41abdacab0026a733c7",
        "60d3b41abdacab0026a733ca",
        "60d3b41abdacab0026a733c7",
        "60d3b41abdacab0026a733ca",
        "60d3b41abdacab0026a733c7",
        "60d3b41abdacab0026a733c6",
      ],
      _id: "63c18e3b936b17001be4dae0",
      status: "done",
      number: 3,
      name: "Spicy краторный бургер",

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

  ////////////////

  const accessToken = getAccessToken();
  const socketUrl = `wss://norma.nomoreparties.space/orders?token=${accessToken}`;

  useEffect(() => {
    const socket = new WebSocket(socketUrl);

    socket.onopen = (event) => {
      dispatch({ type: "CONNECT", payload: socket });
      // console.log("CONNECT");
    };
    console.log("socket", socket);
    // console.log("socket.onmessage1", socket.onmessage);

    socket.onmessage = function (event) {
      console.log("event", event);

      const json = JSON.parse(event.data);
      console.log("______json", json);

      dispatch({ type: "UPDATE_DATA", payload: json });
      // console.log("UPDATE_DATA");
    };

    return () => {
      if (socket.readyState === 1) {
        // <-- This is important
        dispatch({ type: "DISCONNECT" });
        socket.close();
        // console.log("DISCONNECT");
      }
    };
  }, [socketUrl, dispatch]);

  /////////////////////////

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
          {ordersData.orders.map((order: any) => {
            return (
              <Link
                className={profile.details}
                key={order._id}
                to={{
                  pathname: `/profile/orders/${order._id}`,
                }}
              >
                {/* @ts-ignore */}
                <ProfileOrder order={order} id={order._id} />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function ProfileOrder({ order }: { order: any }) {
  const ingredientsStore = useSelector(
    (store: TCombinedReducer) => store.ingredientsReducer
  );
  const ingredientsArray = ingredientsStore.items;
  const orderArray = ingredientsArray.filter((el) => {
    return order.ingredients.includes(el._id);
  });

  const calculateSum = () => {
    let sum = 0;
    if (orderArray.length > 0) {
      sum = orderArray.reduce((a, b) => {
        return a + b.price;
      }, 0);
    }
    const bun = orderArray.find((el) => {
      return el.type === "bun";
    });
    const bunPrice = bun?.price ?? 0;
    return bunPrice + sum;
  };

  return (
    <div className={profile.ordercontainer}>
      <div className={profile.ordernumbercontainer}>
        <div className={profile.ordernumber}>#{order.number}</div>
        <div>{order.createdAt}</div>
      </div>

      <div className={profile.burgertitle}>{order.name}</div>
      <div className={profile.status}>Создан</div>
      <div className={profile.imgpricecontainer}>
        <div>
          {/* @ts-ignore */}
          {orderArray.map((el, i) => {
            return (
              <img
                className={profile.imgicon}
                src={el.image}
                alt={el.name}
                key={i}
              />
            );
          })}
        </div>
        <div className={profile.pricecontainer}>
          <div className={profile.price}>{calculateSum()}</div>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}
