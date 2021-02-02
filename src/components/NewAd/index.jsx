import React, { useState, useLayoutEffect, useEffect } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import Footer from "../Commons/footer";
import Header from "../Commons/header";
import Details from "./details";
import Pictures from "./pictures";
import Payment from "./payment";
import { useAuthToken } from "../../token";
import { redirectionState, adDetailsProgressState } from "../../recoil/atoms";

const NewAd = (props) => {
  const [steps] = useState([
    <Details />,
    <Pictures plan={props.location.state} />,
    <Payment plan={props.location.state} />,
  ]);
  const location = useLocation();
  const [authToken] = useAuthToken();
  const [, setRedirect] = useRecoilState(redirectionState);
  const [step] = useRecoilState(adDetailsProgressState);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    setRedirect(null);
  }, [setRedirect]);

  console.log("props", props.location.state);
  if (!props.location.state) {
    return <Redirect loggedIn to="/ads/new/pricing" />;
  }
  if (!authToken || !props.location.state.type) {
    return <Redirect loggedIn to="/ads/new/pricing" />;
  } else
    return (
      <div className="new-ad">
        <Header />
        <div className="new-ad__steps">
          <div className="new-ad__steps__step">Details</div>
          <div className="new-ad__steps__step">Photos</div>
          {props.location.state && props.location.state.price > 0 && (
            <div className="new-ad__steps__step">Payment</div>
          )}
          <div className="new-ad__steps__step">Finish</div>
        </div>

        <div className="register__main new-ad__main">{steps[step]}</div>
        <div className="register__sidebar new-ad__sidebar">
          <div className="register__sidebar__info new-ad__sidebar__info">
            <i class="far fa-images"></i>
            <h2>Post a Free Classified</h2>
            <p>
              Do you have a vehicle to sell, to rent, any automobile related
              service to offer? Post it at CheapCARS.ng™, its free, for local
              business and very easy to use!{" "}
            </p>
          </div>{" "}
        </div>
        <Footer />
      </div>
    );
};

export default NewAd;
