import React, { useState, useEffect, Dispatch } from "react";
import profile from "./profile.module.css";
import { Link, useRouteMatch } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import {
  profileInfoRequest,
  profileInfoUpdate,
  userExitRequest,
} from "../../services/actions/profile-data";
import { getRefreshToken } from "../../utils/local-storage";
import { TCombinedReducer, TOrder } from "../../types";
import { getAccessToken } from "../../utils/local-storage";
import { WS_URL } from "../../utils/burger-api";
import {
  PROFILE_CONNECTION_INIT,
  PROFILE_CONNECTION_CLOSE,
} from "../../services/actions/profileWS";
import {
  FEED_CONNECTION_INIT,
  FEED_CONNECTION_CLOSE,
} from "../../services/actions/feedWS";

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
  const ordersData1 = useSelector((store: any) => store.reducerWS);
  const arr = ordersData1?.data?.orders ? ordersData1?.data?.orders : [];

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

  const accessToken = getAccessToken();
  const socketUrl = `${WS_URL}/orders?token=${accessToken}`;

  useEffect(() => {
    dispatch({
      type: FEED_CONNECTION_INIT,
      payload: socketUrl,
    });
    dispatch({
      type: PROFILE_CONNECTION_INIT,
      payload: socketUrl,
    });

    return () => {
      dispatch({ type: PROFILE_CONNECTION_CLOSE });
      dispatch({ type: FEED_CONNECTION_CLOSE });
    };
  }, [dispatch]);

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
          {arr.map((order: any) => {
            return (
              <Link
                className={profile.details}
                key={order._id}
                to={{
                  pathname: `/profile/orders/${order._id}`,
                }}
              >
                <ProfileOrder order={order} />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function ProfileOrder({ order }: { order: TOrder }) {
  const ingredientsStore = useSelector(
    (store: TCombinedReducer) => store.ingredientsReducer
  );
  const ingredientsArray = ingredientsStore.items;
  let orderArray = ingredientsArray.filter((el) => {
    return order.ingredients.includes(el._id);
  });

  const remainingIngredients = orderArray.length - 5;

  if (orderArray.length > 5) {
    orderArray = orderArray?.slice(0, 5);
  }

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

  const orderStatus = (status: string): string => {
    if (status === "created") {
      return "Создан";
    }
    if (status === "pending") {
      return "Готовится";
    }
    if (status === "done") {
      return "Выполнен";
    }
    return "";
  };

  const formatDate = (dateFromServer: string) => {
    return <FormattedDate date={new Date(dateFromServer)} />;
  };

  const burgerTitle = order.name.split(" ").slice(0, 6).join(" ");

  return (
    <div className={profile.ordercontainer}>
      <div className={profile.ordernumbercontainer}>
        <div className={profile.ordernumber}>#{order.number}</div>
        <div>{formatDate(order.createdAt)}</div>
      </div>

      <div className={profile.burgertitle}>{burgerTitle}</div>

      <div className={profile.status}>{orderStatus(order.status)}</div>
      <div className={profile.imgpricecontainer}>
        <div className={profile.imgswrapper}>
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
          {remainingIngredients > 0 && (
            <div>{` + ${remainingIngredients}`}</div>
          )}
        </div>
        <div className={profile.pricecontainer}>
          <div className={profile.price}>{calculateSum()}</div>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}
