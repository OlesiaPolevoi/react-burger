import ingredientDetails from "./ingredient-details.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export function IngredientDetails() {
  const { _id } = useParams();

  const ingredientsStore = useSelector((store) => store.ingredientsReducer);
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
          <h4 className={ingredientDetails?.name}>Калории,ккал</h4>
          <div className={ingredientDetails.number}>{ingredient?.calories}</div>
        </div>
        <div>
          <h4 className={ingredientDetails?.name}>Белки, г</h4>
          <div className={ingredientDetails.number}>{ingredient?.proteins}</div>
        </div>
        <div>
          <h4 className={ingredientDetails?.name}>Жиры, г</h4>
          <div className={ingredientDetails.number}>{ingredient?.fat}</div>
        </div>
        <div>
          <h4 className={ingredientDetails?.name}>Углеводы, г</h4>
          <div className={ingredientDetails?.number}>
            {ingredient?.carbohydrates}
          </div>
        </div>
      </div>
    </div>
  );
}
