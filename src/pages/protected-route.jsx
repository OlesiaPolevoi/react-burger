import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export function ProtectedRoute({ onlyForAuth, children, ...rest }) {
  const userData = useSelector((store) => store.userDataReducer);
  const userAuthorized =
    userData.accessToken !== "" && userData.accessToken !== null;

  const location = useLocation();

  if (!onlyForAuth && userAuthorized) {
    const { from } = location.state || { from: { pathname: "/" } };
    return (
      <Route {...rest}>
        <Redirect to={from} />
      </Route>
    );
  }

  if (onlyForAuth && !userAuthorized) {
    return (
      <Route>
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      </Route>
    );
  }

  return <Route {...rest}>{children}</Route>;
}
