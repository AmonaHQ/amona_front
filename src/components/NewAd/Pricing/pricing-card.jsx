import React from "react";
import { useRecoilState } from "recoil";
import { Link } from "react-router-dom";
import { redirectionState } from "../../../recoil/atoms";
import { useAuthToken } from "../../../token";
import { loginModalState } from "../../../recoil/atoms";

const PricingCard = ({
  plan: { type, currencySymbol, price, features, highlight },
}) => {
  const [, setRedirection] = useRecoilState(redirectionState);
  const [authToken] = useAuthToken();
  const [, setModalShow] = useRecoilState(loginModalState);

  const selectPlan = () => {
    if (!authToken) {
      setRedirection("/ads/new");
      setModalShow(true);
    }
  };
  return (
    <div className="pricing__container__card">
      <div
        className="pricing__container__card__header"
        style={
          highlight && {
            backgroundColor: highlight.header,
            color: highlight.headerColor,
          }
        }
      >
        {type}
      </div>
      <div className="pricing__container__card__price">
        <span>{currencySymbol}</span>
        <span>{price}</span> / <span>ad</span>
      </div>

      <ul className="pricing__container__card__features">
        {features.map((feature) => (
          <li>{feature}</li>
        ))}
      </ul>
      <Link
        to={{
          pathname: authToken ? "/ads/new" : "/ads/new/pricing",
          state: { type },
        }}
      >
        <div
          onClick={() => selectPlan(type)}
          style={
            highlight && {
              backgroundColor: highlight.button,
              color: highlight.buttonColor,
            }
          }
          className="pricing__container__card__button"
        >
          Get started
        </div>
      </Link>
    </div>
  );
};

export default PricingCard;
