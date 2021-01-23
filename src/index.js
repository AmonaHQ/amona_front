import React from "react";
import ReactDOM from "react-dom";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import "@material/react-material-icon/dist/material-icon.css";
import "animate.css/animate.css";
import "./index.scss";
import App from "./App";
import client from "./services/client";
import * as serviceWorker from "./serviceWorker";

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_LEFT,
  timeout: 5000,
  offset: "20px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

const Root = () => (
  <BrowserRouter>
    <ApolloProvider client={client()}>
      <CookiesProvider>
        <AlertProvider template={AlertTemplate} {...options}>
          <App />
        </AlertProvider>
      </CookiesProvider>
    </ApolloProvider>
  </BrowserRouter>
);
ReactDOM.render(<Root />, document.getElementById("root"));
if (module.hot) {
  module.hot.accept();
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
