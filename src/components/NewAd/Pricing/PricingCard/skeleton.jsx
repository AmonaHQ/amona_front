import React from "react";


const PricingSkeleton = ({ plan: { features } }) => {
  return (
    <div className="pricing__container__card">
      <div className="pricing__container__card__header">
        <div className="pricing__container__card__header--skeleton"></div>
      </div>
      <div className="pricing__container__card__price">
        <div className="pricing__container__card__price--skeleton"></div>
      </div>

      <ul className="pricing__container__card__features">
        {features.map((feature) => (
          <li className="pricing__container__card__features--skeleton"></li>
        ))}
      </ul>

      <div className="pricing__container__card__button pricing__container__card__button--skeleton"></div>
    </div>
  );
};

export default PricingSkeleton;
