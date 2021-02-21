import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTransactionQuery } from "../../operations/queries";
import { useRecoilState } from "recoil";
import { showWarningState, busyOverlayState } from "../../recoil/atoms";
import numberWithCommas from "../../utilities/number-with-commas";

const Transactions = () => {
  const [, setBusy] = useRecoilState(busyOverlayState);
  const { data, loading } = useTransactionQuery();



  return (
    <div className="dashboard__main__my-ads card">
      <div className="dashboard__main__my-ads__heading">
        <i className="far fa-image"></i> <h2 className="">Transactions </h2>
      </div>

      
      <div className="dashboard__main__my-ads__table">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Type</th>
              <th scope="col">Payment Method</th>
              <th scope="col">Value</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.paymentsByUser &&
              data.paymentsByUser.payments.map((payment, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>

                  <td>{payment.type}</td>
                  <td>{payment.paymentMethod}</td>
                  <td>{`${payment.currencySymbol} ${numberWithCommas(
                    payment.amount
                  )}`}</td>
                  <td>{new Date(parseInt(payment.created_at,10)).toUTCString()}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
