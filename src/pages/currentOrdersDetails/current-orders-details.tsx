import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import currentOrdersDetails from "./current-orders-details.module.css";
// http://localhost:3000/feed/id

export function CurrentOrdersDetails() {
  return (
    <div>
      <div className={currentOrdersDetails.ordernumber}>#034533</div>

      <div className={currentOrdersDetails.burgertitle}>
        Black Hole Singularity острый бургер
      </div>

      <div className={currentOrdersDetails.status}>Выполнен</div>
      <div className={currentOrdersDetails.ingredientstitle}>Состав:</div>

      <div className={currentOrdersDetails.ingredient}>
        <div className={currentOrdersDetails.imgcontainer}>
          <img
            src="https://code.s3.yandex.net/react/code/bun-02.png"
            alt="bun img"
            className={currentOrdersDetails.img}
          />
          <div>Флюоресцентная булка R2-D3</div>
        </div>

        <div>2 x 20</div>
        <CurrencyIcon type="primary" />
      </div>
      <div className={currentOrdersDetails.ingredient}>
        <div className={currentOrdersDetails.imgcontainer}>
          <img
            src="https://code.s3.yandex.net/react/code/meat-01.png"
            alt="bun img"
            className={currentOrdersDetails.img}
          />
          <div>Филе Люминесцентного тетраодонтимформа</div>
        </div>

        <div>1 x 300</div>
        <CurrencyIcon type="primary" />
      </div>

      <div className={currentOrdersDetails.footer}>
        <div>Вчера, 13:50 i-GMT+3</div>

        <div className={currentOrdersDetails.price}>
          <div className={currentOrdersDetails.total}>510</div>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}
