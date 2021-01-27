import React, { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { NavLink } from "react-router-dom";
import { useLoginQuery } from "../../operations/queries";
import { showWarningState, userDetailsState } from "../../recoil/atoms";
import { useRecoilState } from "recoil";

const Overlay = ({ callback }) => {
  const [modalShow, setModalShow] = useRecoilState(showWarningState);
  const [inputData, setInputData] = useRecoilState(userDetailsState);
  const [login, { loading, data, error }] = useLoginQuery();

  const handleDelete = () => {
    setModalShow(false)
    callback();
  };

  return (
    <div className={`overlay ${modalShow && "overlay--show"}`}>
      <div
        className={`overlay__content ${modalShow && "overlay__content--show"}`}
      >
        <div className="overlay__content__body">
          <div className="overlay__content__body__warning">
            <i class="fas fa-exclamation-circle"></i>
            <h2>Are you sure ?</h2>
            <p>you will not be able to recover this data</p>
            <div>
              <button onClick={handleDelete}>Yes delete it!</button>{" "}
              <button onClick={() => setModalShow(false)}>No keep it</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overlay;