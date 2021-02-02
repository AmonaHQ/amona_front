import React from "react";
import Header from "../../Commons/header";
import Footer from "../../Commons/footer";
import PricingCard from "./PricingCard/pricing-card";
import PricingSkeleton from "./PricingCard/skeleton";
import plans from "./plan";

import { usePricingsQuery } from "../../../operations/queries";

const Pricing = () => {
  const { data, loading } = usePricingsQuery();
  if (data) {
    console.log("pricing", data.pricings.pricings);
  }
  return (
    <div className="pricing">
      <Header />

      <div className="pricing__container">
        <h1 className="pricing__container__title">Pricing</h1>,
        <p className="pricing__container__sub-title">
          The premium package help sellers to promote their products or services
          by giving more visibility to their ads to attract more buyers and sell
          faster.
        </p>
        {loading || !(data && data.pricings)
          ? plans.map((plan) => <PricingSkeleton plan={plan} />)
          : data.pricings.pricings.map((plan) => <PricingCard plan={plan} />)}
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;
