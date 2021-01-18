import React, { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { NavLink } from "react-router-dom";
const Overlay = (props) => {
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    setModalShow(props.show);
  }, [props.show]);

  return (
    <div className={`overlay ${modalShow && "overlay--show"}`}>
      <div
        className={`overlay__content ${modalShow && "overlay__content--show"}`}
      >
        <div className="overlay__content__header">
          <span>Login</span>
          <i
            className="overlay__content__header__close fa fa-times"
            onClick={() => {
              setModalShow(false);
              props.resetShow();
            }}
          ></i>
        </div>
        <div className="overlay__content__body">
          <form action="" className="form form--new-ad">
            <div className="formGroup formGroup--login">
              <label htmlFor="" className="formGroup__label">
                Login (Email or Phone)
              </label>
              <div className="formGroup__inputs__double">
                <i className="fa fa-user"></i>
                <input
                  type="text"
                  className="formGroup__input"
                  placeholder="Email or Phone"
                />
              </div>
            </div>
            <div className="formGroup formGroup--login">
              <label htmlFor="" className="formGroup__label">
                Password
              </label>
              <div className="formGroup__inputs__double">
                <i class="fas fa-lock"></i>
                <input
                  type="password"
                  className="formGroup__input"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="form__bottom">
              <div className="form__bottom__check">
                <input type="checkbox" id="keep-logged-in" />
                <label htmlFor="keep-logged-in">Keep me logged in</label>
              </div>
              <div className="form__bottom__links">
                <a href="/">Lost your password ?</a> <span>&nbsp;/&nbsp;</span>{" "}
                <NavLink to="/registration">Register</NavLink>
              </div>
            </div>
            <div className="form__captcha form__captcha--login">
              <ReCAPTCHA
                sitekey="6LdEVBsaAAAAAHx5BRsT0nG5Pm5kBFXGKYxq5ULu"
                onChange={(value) => {}}
              />
            </div>
          </form>
        </div>
        <div className="overlay__content__footer">
          <div className="overlay__content__footer__button">Login</div>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
