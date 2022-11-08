import React from "react";
import ingredientDetails from "./ingredient-details.module.css";
import { ingredientType } from "../../utils/types";

export function IngredientDetails({ el }) {
  return (
    <div className={ingredientDetails.container}>
      <img src={el.image} className={ingredientDetails.img} alt={el.name} />
      <h3 className={ingredientDetails.description}>{el.name}</h3>
      <div className={ingredientDetails.nutrition}>
        <div>
          <h4 className={ingredientDetails.name}>Калории,ккал</h4>
          <div className={ingredientDetails.number}>{el.calories}</div>
        </div>
        <div>
          <h4 className={ingredientDetails.name}>Белки, г</h4>
          <div className={ingredientDetails.number}>{el.proteins}</div>
        </div>
        <div>
          <h4 className={ingredientDetails.name}>Жиры, г</h4>
          <div className={ingredientDetails.number}>{el.fat}</div>
        </div>
        <div>
          <h4 className={ingredientDetails.name}>Углеводы, г</h4>
          <div className={ingredientDetails.number}>{el.carbohydrates}</div>
        </div>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  el: ingredientType,
};