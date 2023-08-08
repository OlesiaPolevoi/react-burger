import ingredientDetails from "./ingredient-details.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TCombinedReducer } from "../../types";

export function IngredientDetails() {
  const { _id } = useParams() as { _id: string };

  const ingredientsStore = useSelector(
    (store: TCombinedReducer) => store.ingredientsReducer
  );
  const ingredient = (ingredientsStore?.items ?? []).find(
    (ingr) => ingr._id === _id
  );

  return (
    <div className={ingredientDetails.container}>
      <img
        src={ingredient?.image}
        className={ingredientDetails.img}
        alt={ingredient?.name}
      />
      <h3 className={ingredientDetails.description}>{ingredient?.name}</h3>
      <div className={ingredientDetails.nutrition}>
        <div>
          <h4 className={ingredientDetails?.name}>Calories,kcal</h4>
          <div className={ingredientDetails.number}>{ingredient?.calories}</div>
        </div>
        <div>
          <h4 className={ingredientDetails?.name}>Proteins, grams</h4>
          <div className={ingredientDetails.number}>{ingredient?.proteins}</div>
        </div>
        <div>
          <h4 className={ingredientDetails?.name}>Fats, grams</h4>
          <div className={ingredientDetails.number}>{ingredient?.fat}</div>
        </div>
        <div>
          <h4 className={ingredientDetails?.name}>Carbs, grams</h4>
          <div className={ingredientDetails?.number}>
            {ingredient?.carbohydrates}
          </div>
        </div>
      </div>
    </div>
  );
}
