export function saveAccessToken(accessToken) {
  const tokenArray = accessToken.split(" ");
  window.localStorage.setItem("access_token", tokenArray[1]);
}

export function saveRefreshToken(refreshToken) {
  window.localStorage.setItem("refresh_token", refreshToken);
}

export function getAccessToken() {
  return window.localStorage.getItem("access_token");
}

export function getRefreshToken() {
  return window.localStorage.getItem("refresh_token");
}
