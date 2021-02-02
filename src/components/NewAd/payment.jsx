import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import ScrollTop from "../../utilities/scroll-top";

const Details = () => {
  const [ads] = useState([
    {
      type: "FREE Ads",
      value: "0.00",
      currency: "₦",
      currencyName: "NGN",
      tips: "Up to 10 images allowed. Free Ad. Keep online for 365 days",
    },
    {
      type: "Urgent Ad",
      value: "25,000.00",
      currency: "₦",
      currencyName: "NGN",
      tips: `30 days of promotion.  Facebook Ads (30 days).  Google Ads (3 days) Up to 10 images allowed. Urgent -NGN (N). Keep online for 365 days`,
    },
    {
      type: "Urgent Ad",
      value: "70.00",
      currency: "$",
      currencyName: "USD",
    },
    {
      type: "Top Page Ad",
      value: "40,000.00",
      currency: "₦",
      currencyName: "NGN",
    },
    {
      type: "Top Page Ad",
      value: "110.00",
      currency: "$",
      currencyName: "USD",
    },
    {
      type: "Top page Ad + Urgent Ad",
      value: "55,000.00",
      currency: "₦",
      currencyName: "NGN",
    },
    {
      type: "Top page Ad + Urgent Ad",
      value: "150.00",
      currency: "$",
      currencyName: "USD",
    },
  ]);
  return (
    <>
      <ScrollTop />
      <div className="register__main__heading">
        <i class="fas fa-tag new-ad__main__heading__icon"></i>
        <h1 className="h1">Pricing</h1>
      </div>
      <div className="new-ad__main__sub-heading">
        <i class="fas fa-certificate"></i>
        <h1 className="h1">Premium Ad</h1>
      </div>
      <p className="new-ad__main__sub-text">
        The premium package help sellers to promote their products or services
        by giving more visibility to their ads to attract more buyers and sell
        faster.{" "}
      </p>

      <form action="" className="form form--new-ad form__payment">
        <div className="payment__options">
          {ads.map((ad, index) => (
            <>
              {ad.type === "FREE Ads" ? (
                <div key={index} className="payment__option" data-tip={ad.tips}>
                  <div className="payment__option__type">
                    <input type="radio" name="payment-option" id={index} />
                    <label htmlFor={index}>{ad.type}</label>
                  </div>

                  <div className="payment__option__value">₦ 0.00</div>
                </div>
              ) : (
                <div className="payment__option" data-tip={ad.tips}>
                  <div className="payment__option__type">
                    <input type="radio" name="payment-option" id={index} />
                    <label htmlFor={index}>
                      {ad.type} - {ad.currencyName} ({ad.currency})
                    </label>{" "}
                    <span>Upgrade</span>
                  </div>

                  <div className="payment__option__value">
                    {ad.currency} {ad.value}
                  </div>
                </div>
              )}
            </>
          ))}
        </div>{" "}
        <ReactTooltip multiline={true} />
      </form>
    </>
  );
};

export default Details;
