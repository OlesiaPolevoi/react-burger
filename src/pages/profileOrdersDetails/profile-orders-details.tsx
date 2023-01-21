import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import profileOrdersDetails from "./profile-orders-details.module.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { TCombinedReducer, TOrder } from "../../types";

export function ProfileOrdersDetails() {
  const ordersData1 = useSelector((store: TCombinedReducer) => store.reducerWS);
  const arr = ordersData1?.data?.orders ? ordersData1?.data?.orders : [];
  const { _id } = useParams() as { _id: string };

  const orderViewing = arr.find((el: TOrder) => {
    return el._id === _id;
  });

  const ingredientsStore = useSelector(
    (store: TCombinedReducer) => store.ingredientsReducer
  );
  const ingredientsArray = ingredientsStore.items;

  const orderArray = ingredientsArray?.filter((el) => {
    if (orderViewing !== undefined) {
      return orderViewing.ingredients.includes(el._id);
    }
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
    <div className={profileOrdersDetails.orderwrapper}>
      <div className={profileOrdersDetails.ordernumber}>#034533</div>

      <div className={profileOrdersDetails.burgertitle}>
        Black Hole Singularity острый бургер
      </div>

      <div className={profileOrdersDetails.status}>Выполнен</div>
      <div className={profileOrdersDetails.ingredientstitle}>Состав:</div>

      {orderArray.map((el) => {
        return (
          <div className={profileOrdersDetails.ingredient} key={el._id}>
            <div className={profileOrdersDetails.imgcontainer}>
              <img
                src={el.image}
                alt={el.name}
                className={profileOrdersDetails.img}
              />
              <div className={profileOrdersDetails.ingredientname}>
                {el.name}
              </div>
            </div>
            <div className={profileOrdersDetails.pricecontainer}>
              {el.type === "bun" ? (
                <div className={profileOrdersDetails.ingredientprice}>
                  2 x {el.price}
                </div>
              ) : (
                <div className={profileOrdersDetails.ingredientprice}>
                  1 x {el.price}
                </div>
              )}
              <CurrencyIcon type="primary" />
            </div>
          </div>
        );
      })}

      <div className={profileOrdersDetails.footer}>
        <div className={profileOrdersDetails.date}>
          {orderViewing !== undefined && formatDate(orderViewing.createdAt)}
        </div>

        <div className={profileOrdersDetails.price}>
          <div className={profileOrdersDetails.total}>{calculateSum()}</div>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}
