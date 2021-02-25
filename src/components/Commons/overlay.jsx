import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useLoginQuery } from "../../operations/queries";
import { loginModalState, userDetailsState } from "../../recoil/atoms";
import { useRecoilState } from "recoil";
import { redirectionState } from "../../recoil/atoms";

const Overlay = (props) => {
  const [modalShow, setModalShow] = useRecoilState(loginModalState);
  const [inputData, setInputData] = useRecoilState(userDetailsState);
  const [login, { loading, data, error }] = useLoginQuery();
  const [redirection, setRedirection] = useRecoilState(redirectionState);

  const handleChange = (event) => {
    const data = { ...inputData };
    data[event.target.name] = event.target.value;
    setInputData(data);
  };

  const handleSubmit = () => {
    login(inputData);
  };
  if (data && data.signIn) {
    setModalShow(false);
    if (redirection && redirection.path) {
      setRedirection({ path: "null", state: {} });
      return (
        <Redirect
          to={{
            pathname: redirection.path,
            state: redirection.state,
          }}
        />
      );
    }
  }


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
          {error && !loading && (
            <p className="error-message animated shake">
              {error && error.graphQLErrors[0].message}
            </p>
          )}

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
                  name="email"
                  value={inputData.email}
                  onChange={handleChange}
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
                  name="password"
                  value={inputData.password}
                  onChange={handleChange}
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
                <NavLink onClick={() => setModalShow(false)} to="/registration">
                  Register
                </NavLink>
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
          <div
            onClick={handleSubmit}
            className={`overlay__content__footer__button ${
              loading && "overlay__content__footer__button--loading"
            }`}
          >
            <span>Login</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
