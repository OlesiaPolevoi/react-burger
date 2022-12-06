import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export function ProtectedRoute({ children, ...rest }) {
  const userData = useSelector((store) => store.userDataReducer);
  const userAuthorized = userData.accessToken !== "";

  return (
    <Route
      {...rest}
      render={() => (userAuthorized ? children : <Redirect to="/login" />)}
    />
  );
}
