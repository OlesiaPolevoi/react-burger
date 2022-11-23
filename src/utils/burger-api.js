const BASE_URL = "https://norma.nomoreparties.space/api";

const getIngredients = {
  method: "get",
  url: `${BASE_URL}/ingredients`,
  headers: {},
};

export { BASE_URL, getIngredients };
