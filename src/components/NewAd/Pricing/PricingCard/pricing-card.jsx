import React from "react";
import { useRecoilState } from "recoil";
import { Link } from "react-router-dom";
import { redirectionState } from "../../../../recoil/atoms";
import { useAuthToken } from "../../../../token";
import { loginModalState } from "../../../../recoil/atoms";
import numberWithCommas from "../../../../utilities/number-with-commas";

const PricingCard = ({
  plan: { type, _id, currency, currencySymbol, price, features, highlights },
}) => {
  const [, setRedirection] = useRecoilState(redirectionState);
  const [authToken] = useAuthToken();
  const [, setModalShow] = useRecoilState(loginModalState);

  const selectPlan = () => {
    if (!authToken) {
      setRedirection({
        path: "/ads/new",
        state: { type, planId: _id, price, currency, currencySymbol },
      });
      setModalShow(true);
    }
  };
  return (
    <div className="pricing__container__card">
      <div
        className="pricing__container__card__header"
        style={
          highlights && {
            backgroundColor: highlights.header,
            color: highlights.headerColor,
          }
        }
      >
        {type}
      </div>
      <div className="pricing__container__card__price">
        <span>{currencySymbol}</span>
        <span>{numberWithCommas(price)}</span> / <span>ad</span>
      </div>

      <ul className="pricing__container__card__features">
        {features.length && features.map((feature) => <li>{feature}</li>)}
      </ul>
      <Link
        to={{
          pathname: authToken ? "/ads/new" : "/ads/new/pricing",
          state: {
            type,
            planId: _id,
            price,
            currency,
            currencySymbol,
            _id: null,
          },
        }}
      >
        <div
          onClick={() => selectPlan()}
          style={
            highlights && {
              backgroundColor: highlights.button,
              color: highlights.buttonColor,
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
