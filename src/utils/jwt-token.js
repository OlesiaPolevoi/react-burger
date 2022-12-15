import jwt_decode from "jwt-decode";

const isTokenExpired = (acesToken) => {
  const decodedToken = jwt_decode(acesToken);
  const date = new Date().getTime();
  return decodedToken?.exp < date.toString().slice(0, -3);
};

export { isTokenExpired };
