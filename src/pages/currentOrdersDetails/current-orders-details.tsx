import React, { useEffect } from "react";

import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import currentOrdersDetails from "./current-orders-details.module.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { TCombinedReducer, TOrder } from "../../types";

import { WS_URL } from "../../utils/burger-api";
import {
  FEED_CONNECTION_INIT,
  FEED_CONNECTION_CLOSE,
} from "../../services/actions/feedWS";
import { useAppDispatch } from "../../services/hooks";

export function CurrentOrdersDetails() {
  const socketUrl = `${WS_URL}/orders/all`;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({
      type: FEED_CONNECTION_INIT,
      payload: socketUrl,
    });

    return () => {
      dispatch({ type: FEED_CONNECTION_CLOSE });
    };
  }, [dispatch]);

  const { _id } = useParams() as { _id: string };
  const ordersData1 = useSelector((store: TCombinedReducer) => store.reducerWS);

  const ingredientsStore = useSelector(
    (store: TCombinedReducer) => store.ingredientsReducer
  );

  const arr = ordersData1?.data?.orders ? ordersData1?.data?.orders : [];

  const orderViewing = (arr ?? []).find((el: TOrder) => {
    return el._id === _id;
  });

  const ingredientsArray = ingredientsStore.items;

  const orderArray = ingredientsArray?.filter((el) => {
    return orderViewing?.ingredients?.includes(el._id);
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

  const formatDate = (dateFromServer: string) => {
    return <FormattedDate date={new Date(dateFromServer)} />;
  };

  return (
    <div>
      {orderArray.length > 0 ? (
        <div className={currentOrdersDetails.orderwrapper}>
          <div className={currentOrdersDetails.ordernumber}>
            #{orderViewing?.number}
          </div>

          <div className={currentOrdersDetails.burgertitle}>
            {orderViewing?.name}
          </div>

          <div className={currentOrdersDetails.status}>
            {orderViewing?.status === "done" ? "Done" : "In progress"}
          </div>
          <div className={currentOrdersDetails.ingredientstitle}>
            All ingredients:
          </div>

          {orderArray?.map((el) => {
            return (
              <div className={currentOrdersDetails.ingredient} key={el._id}>
                <div className={currentOrdersDetails.imgcontainer}>
                  <img
                    src={el.image}
                    alt={el.name}
                    className={currentOrdersDetails.img}
                  />
                  <div className={currentOrdersDetails.ingredientname}>
                    {el.name}
                  </div>
                </div>
                <div className={currentOrdersDetails.pricecontainer}>
                  {el.type === "bun" ? (
                    <div className={currentOrdersDetails.ingredientprice}>
                      2 x {el.price}
                    </div>
                  ) : (
                    <div className={currentOrdersDetails.ingredientprice}>
                      1 x {el.price}
                    </div>
                  )}
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            );
          })}

          <div className={currentOrdersDetails.footer}>
            <div className={currentOrdersDetails.date}>
              {orderViewing !== undefined &&
                formatDate(orderViewing?.createdAt)}
            </div>

            <div className={currentOrdersDetails.price}>
              <div className={currentOrdersDetails.ingredientprice}>
                {calculateSum()}
              </div>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      ) : (
        <div className={currentOrdersDetails.loading}>Loading...</div>
      )}
    </div>
  );
}
