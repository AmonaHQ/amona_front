import React, { Fragment } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
// import { Offline, Online } from "react-detect-offline";
import { RecoilRoot } from "recoil";
import Home from "./components/Home/index";
import AllAds from "./components/AllAds/index";
import AddDetails from "./components/AdDetails/index";
import Registration from "./components/Authentication/Registration/index";
import BusyOverlay from "./components/Commons/busy-overlay";
import NewAd from "./components/NewAd/index";
import Dashboard from "./components/Dashboard/index";
import Login from "./components/Authentication/Login/index";
import Pricing from "./components/NewAd/Pricing/index";
import { ProtectedRoute } from "./config/protected-route";

function App() {
  return (
    <CookiesProvider>
      <RecoilRoot>
        <BusyOverlay />
        <Fragment>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/ads" component={AllAds}></Route>{" "}
              <Route
                exact
                path="/ads/details/:permalink"
                component={AddDetails}
              ></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/ads/new/pricing" component={Pricing}></Route>
              <Route
                exact
                path="/registration"
                component={Registration}
              ></Route>
              <Route exact path="/ads/new" component={NewAd}></Route>
              <ProtectedRoute
                exact
                path="/account"
                component={Dashboard}
              ></ProtectedRoute>
            </Switch>
          </BrowserRouter>
        </Fragment>
      </RecoilRoot>
    </CookiesProvider>
  );
}

export default App;
