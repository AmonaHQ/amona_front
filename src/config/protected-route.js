import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useAuthToken } from "../token";
import { currentLoginState } from "../recoil/selectors";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [authToken] = useAuthToken();
  const isLoggedIn = useRecoilValue(currentLoginState);
  const token = localStorage.getItem("authToken");
  console.log("auth", authToken, "isLogedIn", isLoggedIn, "token", token);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (authToken || isLoggedIn || token !== "null") {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/registration",
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    />
  );
};
