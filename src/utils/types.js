import PropTypes from "prop-types";

export const ingredientType = PropTypes.shape({
  name: PropTypes.string,
  calories: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  proteins: PropTypes.number,
});
