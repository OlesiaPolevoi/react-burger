import React from "react";
import {
  Tab,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import "./burger-ingredients.css";

export default function BurgerIngredients() {
  const [current, setCurrent] = React.useState("one");

  return (
    <main>
      <h1 className="main-header">Соберите бургер</h1>

      <div style={{ display: "flex" }} className="main-tab">
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>

      {/* <h2 className="secondary-header">Булки</h2>

      <div className="container">
        <div className="ingredient">
          <img src="https://code.s3.yandex.net/react/code/bun-02.png" />
          <div className="price">
            <div className="price-number">20</div>
            <CurrencyIcon type="primary" />
          </div>

          <div className="description">Краторная булка N-200i</div>
        </div>

        <div className="ingredient">
          <img src="https://code.s3.yandex.net/react/code/bun-01.png" />
          <div className="price">
            <div className="price-number">20</div>
            <CurrencyIcon type="primary" />
          </div>

          <div className="description">Флюоресцентная булка R2-D3</div>
        </div>
      </div> */}
      <IngredientsContainer header="Булки" />
      <h2 className="secondary-header">Соусы</h2>

      <div className="container">
        <div className="ingredient">
          <img src="https://code.s3.yandex.net/react/code/sauce-02.png" />
          <div className="price">
            <div className="price-number">30</div>
            <CurrencyIcon type="primary" />
          </div>

          <div className="description">Соус Spicy-X</div>
        </div>

        <div className="ingredient">
          <img src="https://code.s3.yandex.net/react/code/sauce-04.png" />
          <div className="price">
            <div className="price-number">30</div>
            <CurrencyIcon type="primary" />
          </div>

          <div className="description">Соус фирменный Space Sauce</div>
        </div>

        <div className="ingredient">
          <img src="https://code.s3.yandex.net/react/code/sauce-03.png" />
          <div className="price">
            <div className="price-number">30</div>
            <CurrencyIcon type="primary" />
          </div>

          <div className="description">Соус традиционный галактический</div>
        </div>

        <div className="ingredient">
          <img src="https://code.s3.yandex.net/react/code/sauce-01.png" />
          <div className="price">
            <div className="price-number">30</div>
            <CurrencyIcon type="primary" />
          </div>

          <div className="description">
            Соус с шипами Антарианского плоскоходца
          </div>
        </div>
      </div>

      <h2 className="secondary-header">Начинки</h2>

      <div className="container">
        <div className="ingredient">
          <img src="https://code.s3.yandex.net/react/code/sp_1.png" />
          <div className="price">
            <div className="price-number">80</div>
            <CurrencyIcon type="primary" />
          </div>

          <div className="description">Плоды Фалленианского дерева</div>
        </div>
        <div className="ingredient">
          <img src="https://code.s3.yandex.net/react/code/mineral_rings.png" />
          <div className="price">
            <div className="price-number">80</div>
            <CurrencyIcon type="primary" />
          </div>

          <div className="description">Хрустящие минеральные кольца</div>
        </div>
      </div>
    </main>
  );
}

function IngredientsContainer({ header }) {
  return (
    <>
      <h2 className="secondary-header">{header}</h2>

      <div className="container">
        {/* <div className="ingredient">
          <img src="https://code.s3.yandex.net/react/code/bun-02.png" />
          <div className="price">
            <div className="price-number">20</div>
            <CurrencyIcon type="primary" />
          </div>

          <div className="description">Краторная булка N-200i</div>
        </div> */}
        <Ingredient />

        <div className="ingredient">
          <img src="https://code.s3.yandex.net/react/code/bun-01.png" />
          <div className="price">
            <div className="price-number">20</div>
            <CurrencyIcon type="primary" />
          </div>

          <div className="description">Флюоресцентная булка R2-D3</div>
        </div>
      </div>
    </>
  );
}

function Ingredient() {
  return (
    <>
      <div className="ingredient">
        <img src="https://code.s3.yandex.net/react/code/bun-02.png" />
        <div className="price">
          <div className="price-number">20</div>
          <CurrencyIcon type="primary" />
        </div>

        <div className="description">Краторная булка N-200i</div>
      </div>
    </>
  );
}

// У компонента свой кастомизированный скроллбар. Подумайте над реализацией и возможным ограничением высоты блока, в том числе и на разных разрешениях экранов.
