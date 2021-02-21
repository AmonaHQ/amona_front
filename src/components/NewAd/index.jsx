import React, { useState, useLayoutEffect, useEffect } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import Footer from "../Commons/footer";
import Header from "../Commons/header";
import Details from "./details";
import Pictures from "./pictures";
import Payment from "./payment";
import { useAuthToken } from "../../token";
import {
  redirectionState,
  adDetailsProgressState,
  detailsState,
  errorMessageState,
} from "../../recoil/atoms";

const NewAd = (props) => {
  const [steps] = useState([
    <Details plan={props.location.state} />,
    <Pictures plan={props.location.state} />,
    <Payment plan={props.location.state} />,
  ]);
  const location = useLocation();
  const [authToken] = useAuthToken();
  const [, setRedirect] = useRecoilState(redirectionState);
  const [step, setStep] = useRecoilState(adDetailsProgressState);
  const [errorMessage, setShowError] = useRecoilState(errorMessageState);
  const [details] = useRecoilState(detailsState);

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
          <div
            className="new-ad__steps__step"
            onClick={() => {
              if (details.description) {
                setStep(0);
                window.scrollTo(0, 0);
              }
            }}
            style={details.description && { color: "blue", cursor: "pointer" }}
          >
            Details
          </div>
          <div
            className="new-ad__steps__step"
            onClick={() => {
              if (details.description) {
                setStep(1);
              }
            }}
            style={details.description && { color: "blue", cursor: "pointer" }}
          >
            Photos
          </div>
          {props.location.state &&
            props.location.state.price > 0 &&
            !props.location.state._id && (
              <div
                className="new-ad__steps__step"
                onClick={() => {
                  if (details.pictures) {
                    setStep(2);
                  }
                }}
                style={details.pictures && { color: "blue", cursor: "pointer" }}
              >
                Payment
              </div>
            )}
          {!props.location.state._id && (
            <div className="new-ad__steps__step">Finish</div>
          )}
        </div>

        <div
          class={`registration-error-message mb-2  ${
            !errorMessage.success && "registration-error-message--show"
          }`}
        >
          <div
            className={`registration-error-message__container mt-0 ${
              !errorMessage.success
                ? "registration-error-message__container--show"
                : "registration-error-message__container--hide"
            }`}
          >
            <div className="registration-error-message__header">
              <h2>
                Oops ! An error has occurred. Please make some corrections
              </h2>{" "}
              <i
                className="fa fa-times"
                onClick={() => setShowError({ success: true })}
              ></i>
            </div>
            <div className="registration-error-message__content">
              {errorMessage.emptyFields}
            </div>
          </div>
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
