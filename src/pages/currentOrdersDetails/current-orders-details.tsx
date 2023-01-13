import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import currentOrdersDetails from "./current-orders-details.module.css";
import { ordersData } from "../currentOrders/current-orders";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { TCombinedReducer } from "../../types";

export function CurrentOrdersDetails() {
  const { _id } = useParams() as { _id: string };
  // @ts-ignore
  const orderViewing = ordersData.orders.find((el) => {
    return el._id === _id;
  });

  const ingredientsStore = useSelector(
    (store: TCombinedReducer) => store.ingredientsReducer
  );
  const ingredientsArray = ingredientsStore.items;
  const orderArray = ingredientsArray.filter((el) => {
    return orderViewing.ingredients.includes(el._id);
  });
  // console.log("orderArray", orderArray);

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
    <div className={currentOrdersDetails.orderwrapper}>
      <div className={currentOrdersDetails.ordernumber}>
        #{orderViewing.number}
      </div>

      <div className={currentOrdersDetails.burgertitle}>
        {orderViewing.name}
      </div>

      <div className={currentOrdersDetails.status}>
        {orderViewing.status === "done" ? "Выполнен" : "Готовится"}
      </div>
      <div className={currentOrdersDetails.ingredientstitle}>Состав:</div>

      {orderArray.map((el) => {
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
        <div>{orderViewing.createdAt}</div>

        <div className={currentOrdersDetails.price}>
          <div className={currentOrdersDetails.ingredientprice}>
            {calculateSum()}
          </div>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}
