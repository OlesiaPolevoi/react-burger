import React from "react";
import "./burger-constructor.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

// img
export default function BurgerConstructor() {
  return (
    <section>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div className="burger-constructor-container">
          <DragIcon type="primary" />

          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={
              "https://code.s3.yandex.net/react/code/mineral_rings.png"
            }
          />
        </div>

        <ConstructorElement
          text="Краторная булка N-200i (верх)"
          price={50}
          thumbnail={"https://code.s3.yandex.net/react/code/mineral_rings.png"}
        />
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={"https://code.s3.yandex.net/react/code/mineral_rings.png"}
          // thumbnail={img}
        />
      </div>
    </section>
  );
}

// () {
//   return <section class="section"> HelloBurgerConstructor</section>;
// }
