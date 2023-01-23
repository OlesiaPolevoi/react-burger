const BASE_URL = "https://norma.nomoreparties.space/api";

const WS_URL = "wss://norma.nomoreparties.space";

const getIngredients = {
  method: "get",
  url: `${BASE_URL}/ingredients`,
  headers: {},
};

export { BASE_URL, WS_URL, getIngredients };
