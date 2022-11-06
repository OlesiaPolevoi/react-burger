import React from "react";
import ingredientDetails from "./ingredient-details.module.css";
import PropTypes from "prop-types";

export function IngredientDetails({
  name,
  image,
  calories,
  carbohydrates,
  fat,
  proteins,
}) {
  return (
    <div className={ingredientDetails.container}>
      <img src={image} className={ingredientDetails.img} />
      <h3 className={ingredientDetails.description}>{name}</h3>
      <div className={ingredientDetails.nutrition}>
        <div>
          <h4 className={ingredientDetails.name}>Калории,ккал</h4>
          <div className={ingredientDetails.number}>{calories}</div>
        </div>
        <div>
          <h4 className={ingredientDetails.name}>Белки, г</h4>
          <div className={ingredientDetails.number}>{proteins}</div>
        </div>
        <div>
          <h4 className={ingredientDetails.name}>Жиры, г</h4>
          <div className={ingredientDetails.number}>{fat}</div>
        </div>
        <div>
          <h4 className={ingredientDetails.name}>Углеводы, г</h4>
          <div className={ingredientDetails.number}>{carbohydrates}</div>
        </div>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
};
