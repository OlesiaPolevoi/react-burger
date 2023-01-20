import React, { useEffect } from "react";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import feed from "./feed.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { TCombinedReducer, TOrder } from "../../types";
import { useDispatch } from "react-redux";
import { WS_URL } from "../../utils/burger-api";
import {
  FEED_CONNECTION_INIT,
  FEED_CONNECTION_CLOSE,
} from "../../services/actions/feedWS";

export function Feed() {
  const socketUrl = `${WS_URL}/orders/all`;
  const dispatch = useDispatch();
  const ordersData1 = useSelector((store: any) => store.reducerWS);
  const arr = ordersData1?.data?.orders ? ordersData1?.data?.orders : [];

  useEffect(() => {
    dispatch({
      type: FEED_CONNECTION_INIT,
      payload: socketUrl,
    });

    return () => {
      dispatch({ type: FEED_CONNECTION_CLOSE });
    };
  }, [dispatch]);

  return (
    <div className={feed.mainwrapper}>
      <h2 className={feed.title}> Лента заказов </h2>
      <div className={feed.wrapper}>
        <div className={feed.container}>
          {arr.map((order: any) => {
            return (
              <Link
                className={feed.details}
                key={order._id}
                to={{
                  pathname: `/feed/${order._id}`,
                }}
              >
                <Order order={order} key={order._id} />
              </Link>
            );
          })}
        </div>
        <OrdersInfo />
      </div>
    </div>
  );
}

export function Order({ order }: { order: TOrder }) {
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
    <div className={feed.ordercontainer}>
      <div className={feed.ordernumbercontainer}>
        <div className={feed.ordernumber}>#{order.number}</div>
        <div className={feed.date}>{formatDate(order.createdAt)}</div>
      </div>

      <div className={feed.burgertitle}>{burgerTitle}</div>
      <div className={feed.imgpricecontainer}>
        <div className={feed.imgswrapper}>
          {orderArray.map((el, i) => {
            return (
              <img
                className={feed.imgicon}
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
        <div className={feed.pricecontainer}>
          <div className={feed.price}>{calculateSum()}</div>
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
    const readyOrders1 = arr?.orders?.filter((el: TOrder) => {
      return el.status === "done";
    });
    readyOrders = readyOrders1.slice(0, 11);

    workingOrders = arr?.orders?.filter((el: TOrder) => {
      return el.status === "pending";
    });
  }

  return (
    <div className={feed.ordersinfo}>
      <div className={feed.ordersinfocontainer}>
        <div>
          <h3 className={feed.secondarytitle}>Готовы:</h3>
          <ul>
            {readyOrders?.map((el: TOrder) => {
              return (
                <li className={feed.readyorders} key={el.number}>
                  {el.number}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h3 className={feed.secondarytitle}>В работе:</h3>
          <ul>
            {workingOrders?.map((el: TOrder) => {
              return (
                <li className={feed.workingorders} key={el.number}>
                  {el.number}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div>
        <h3 className={feed.secondarytitle}>Выполнено за все время:</h3>
        <p className={feed.fulfilledorder}>{arr?.total}</p>
      </div>
      <div>
        <h3 className={feed.secondarytitle}>Выполнено за сегодня:</h3>
        <p className={feed.fulfilledorder}>{arr?.totalToday}</p>
      </div>
    </div>
  );
}
