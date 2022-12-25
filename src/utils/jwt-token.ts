import jwt_decode from 'jwt-decode';

const isTokenExpired = (acesToken: string) => {
  const decodedToken = jwt_decode(acesToken);
  const date = new Date().getTime();
  //@ts-ignore
  return decodedToken?.exp < date.toString().slice(0, -3);
};

export { isTokenExpired };
