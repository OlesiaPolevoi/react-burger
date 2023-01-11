import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import profileOrdersDetails from "./profile-orders-details.module.css";
// http://localhost:3000/profile/orders/id

export function ProfileOrdersDetails() {
  return (
    <div>
      <div className={profileOrdersDetails.ordernumber}>#034533</div>

      <div className={profileOrdersDetails.burgertitle}>
        Black Hole Singularity острый бургер
      </div>

      <div className={profileOrdersDetails.status}>Выполнен</div>
      <div className={profileOrdersDetails.ingredientstitle}>Состав:</div>

      <div className={profileOrdersDetails.ingredient}>
        <div className={profileOrdersDetails.imgcontainer}>
          <img
            src="https://code.s3.yandex.net/react/code/bun-02.png"
            alt="bun img"
            className={profileOrdersDetails.img}
          />
          <div>Флюоресцентная булка R2-D3</div>
        </div>

        <div>2 x 20</div>
        <CurrencyIcon type="primary" />
      </div>
      <div className={profileOrdersDetails.ingredient}>
        <div className={profileOrdersDetails.imgcontainer}>
          <img
            src="https://code.s3.yandex.net/react/code/meat-01.png"
            alt="bun img"
            className={profileOrdersDetails.img}
          />
          <div>Филе Люминесцентного тетраодонтимформа</div>
        </div>

        <div>1 x 300</div>
        <CurrencyIcon type="primary" />
      </div>

      <div className={profileOrdersDetails.footer}>
        <div>Вчера, 13:50 i-GMT+3</div>

        <div className={profileOrdersDetails.price}>
          <div className={profileOrdersDetails.total}>510</div>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}
