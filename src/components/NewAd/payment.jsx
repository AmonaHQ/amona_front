import React, { useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { Redirect } from "react-router-dom";
import { useRecoilState } from "recoil";
import ScrollTop from "../../utilities/scroll-top";
import CustomDropdown from "../Commons/custom-dropdown";
import Paystack from "../../assets/img/icons/paystack.png";
import Paypal from "../../assets/img/icons/paypal.png";
import numberWithCommas from "../../utilities/number-with-commas";
import { detailsState } from "../../recoil/atoms";
import {
  useCreatePaymentMutation,
  useCreateCarMutation,
} from "../../operations/mutations";

const Details = ({ plan }) => {
  const [paymentMethod, setPaymentMethod] = useState({});
  const [details] = useRecoilState(detailsState);
  const [createCar, createCarResult] = useCreateCarMutation();
  const [createPayment, createPaymentResult] = useCreatePaymentMutation();

  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    const { price, planId, type, currency, currencySymbol } = plan;
    createCar(details);
    createPayment({
      paymentMethod: paymentMethod.value,
      planId: planId,
      paymentReference: reference.reference,
      type: type,
      currencySymbol,
      currency,
      amount: price,
    });
    console.log(reference, details);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const config = {
    reference: new Date().getTime(),
    email: details.email,
    amount: plan.price * 100,
    publicKey: "pk_test_b4728c06934db7463db4ecccd1e3d82340d776a2",
  };

  const initializePayment = usePaystackPayment(config);

  if (createCarResult.data && createPaymentResult.data) {
    return (
      <Redirect
        loggedIn
        to={{
          pathname: "/",
          state: {
            payment: true,
          },
        }}
      />
    );
  }
  return (
    <>
      <ScrollTop />
      <div className="register__main__heading">
        <i class="fas fa-wallet new-ad__main__heading__icon"></i>
        <h1 className="h1">Payment</h1>
      </div>
      <div className="payment">
        <div className="payment__options">
          <CustomDropdown
            items={[
              { name: "For ₦(NGN), Pay with Paystack", value: "paystack" },
              { name: "For $(USD), Pay with Paypal", value: "paypal" },
              { name: "Choose Payment Option" },
            ]}
            onSelect={(item) => setPaymentMethod(item)}
            placeHolder="Choose Payment Option"
          />

          <h4 className="payment__options__amount">
            Payable Amount:{" "}
            {`${plan.currencySymbol} ${numberWithCommas(plan.price)}`}
          </h4>
        </div>
        <div className="payment__payment-option">
          {paymentMethod.value === "paystack" && (
            <>
              <div className="payment__payment-option__image animated fadeIn">
                <img src={Paystack} alt={paymentMethod.name} />
              </div>{" "}
              <button
                onClick={() => {
                  initializePayment(onSuccess, onClose);
                }}
              >
                Pay
              </button>
            </>
          )}
          {paymentMethod.value === "paypal" && (
            <>
              <div className="payment__payment-option__image animated fadeIn">
                <img src={Paypal} alt={paymentMethod.name} />
              </div>
              <button>Pay</button>
            </>
          )}

          {!paymentMethod.value && (
            <div className="payment__payment-option__image animated fadeIn">
              <h2>No Payment Method Selected</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Details;
