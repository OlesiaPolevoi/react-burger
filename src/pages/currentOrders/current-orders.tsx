import React, { useEffect } from "react";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import currentOrders from "./current-orders.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { TCombinedReducer } from "../../types";
import { useDispatch } from "react-redux";
import { WS_URL } from "../../utils/burger-api";

export function CurrentOrders() {
  //wss://norma.nomoreparties.space
  const socketUrl = `${WS_URL}/orders/all`;
  const dispatch = useDispatch();
  const ordersData1 = useSelector((store: any) => store.reducerWS);
  const arr = ordersData1?.data?.orders ? ordersData1?.data?.orders : [];

  useEffect(() => {
    const socket = new WebSocket(socketUrl);

    socket.onopen = (event) => {
      dispatch({ type: "CONNECT", payload: socket });
    };

    socket.onmessage = function (event) {
      const json = JSON.parse(event.data);
      dispatch({ type: "UPDATE_DATA", payload: json });
    };

    return () => {
      if (socket.readyState === 1) {
        dispatch({ type: "DISCONNECT" });
        socket.close();
      }
    };
  }, [socketUrl, dispatch]);

  return (
    <div className={currentOrders.mainwrapper}>
      <h2 className={currentOrders.title}> Лента заказов </h2>
      <div className={currentOrders.wrapper}>
        <div className={currentOrders.container}>
          {arr.map((order: any) => {
            return (
              <Link
                className={currentOrders.details}
                key={order._id}
                to={{
                  pathname: `/feed/${order._id}`,
                }}
              >
                {/* @ts-ignore */}
                <Order order={order} key={order._id} id={order._id} />
              </Link>
            );
          })}
        </div>
        <OrdersInfo />
      </div>
    </div>
  );
}

// @ts-ignore
export function Order({ order }) {
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

  const burgerTitle = order.name.split(" ").slice(0, 6).join(" ");

  const formatDate = (dateFromServer: string) => {
    return <FormattedDate date={new Date(dateFromServer)} />;
  };

  return (
    <div className={currentOrders.ordercontainer}>
      <div className={currentOrders.ordernumbercontainer}>
        <div className={currentOrders.ordernumber}>#{order.number}</div>
        <div className={currentOrders.date}>{formatDate(order.createdAt)}</div>
      </div>

      <div className={currentOrders.burgertitle}>{burgerTitle}</div>
      <div className={currentOrders.imgpricecontainer}>
        <div className={currentOrders.imgswrapper}>
          {orderArray.map((el, i) => {
            return (
              <img
                className={currentOrders.imgicon}
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
        <div className={currentOrders.pricecontainer}>
          <div className={currentOrders.price}>{calculateSum()}</div>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}

export function OrdersInfo() {
  const ordersData1 = useSelector((store: any) => store.reducerWS);

  const arr = ordersData1?.data ? ordersData1?.data : null;
  let readyOrders = [];
  let workingOrders = [];
  if (arr?.orders?.length > 0) {
    // @ts-ignore
    const readyOrders1 = arr?.orders?.filter((el) => {
      return el.status === "done";
    });
    readyOrders = readyOrders1.slice(0, 11);
    // @ts-ignore
    workingOrders = arr?.orders?.filter((el) => {
      return el.status === "pending";
    });
  }

  return (
    <div className={currentOrders.ordersinfo}>
      <div className={currentOrders.ordersinfocontainer}>
        <div>
          <h3 className={currentOrders.secondarytitle}>Готовы:</h3>
          <ul>
            {/* @ts-ignore */}
            {readyOrders?.map((el) => {
              return (
                <li className={currentOrders.readyorders} key={el.number}>
                  {el.number}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h3 className={currentOrders.secondarytitle}>В работе:</h3>
          <ul>
            {/* @ts-ignore */}
            {workingOrders?.map((el) => {
              return (
                <li className={currentOrders.workingorders} key={el.number}>
                  {el.number}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div>
        <h3 className={currentOrders.secondarytitle}>
          Выполнено за все время:
        </h3>
        <p className={currentOrders.fulfilledorder}>{arr?.total}</p>
      </div>
      <div>
        <h3 className={currentOrders.secondarytitle}>Выполнено за сегодня:</h3>
        <p className={currentOrders.fulfilledorder}>{arr?.totalToday}</p>
      </div>
    </div>
  );
}
