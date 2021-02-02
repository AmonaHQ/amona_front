import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { userDetailsState } from "../../../recoil/atoms";
import { useRecoilState } from "recoil";
import Header from "../../Commons/header";
import Footer from "../../Commons/footer";
import { useLoginQuery } from "../../../operations/queries";
import { useAuthToken } from "../../../token";

const Login = () => {
  const [authToken] = useAuthToken();
  const [inputData, setInputData] = useRecoilState(userDetailsState);
  const [login, { loading, error }] = useLoginQuery();

  const handleChange = (event) => {
    const data = { ...inputData };
    data[event.target.name] = event.target.value;
    setInputData(data);
  };
  const handleSubmit = () => {
    login(inputData);
  };
  if (authToken) {
    return <Redirect loggedIn to="/account" />;
  }
  return (
    <div className="login">
      <Header />
      <div className="login__container">
        <div className="login__container__card">
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

            <div className="form__bottom"></div>
            <div className="form__captcha form__captcha--login">
              <ReCAPTCHA
                sitekey="6LdEVBsaAAAAAHx5BRsT0nG5Pm5kBFXGKYxq5ULu"
                onChange={(value) => {}}
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className={`login__button ${loading && "login__button--loading"}`}
            >
              <span>Login</span>
            </button>
          </form>

          <div className="login__container__card__footer">
            {" "}
            <div className="form__bottom__check">
              <input type="checkbox" id="keep-logged-in" />
              <label htmlFor="keep-logged-in">Keep me logged in</label>
            </div>{" "}
            <NavLink to="/">Lost your password ?</NavLink>
          </div>
        </div>
        <p className="signup-request">Do not have an account ?</p>
        <NavLink to="/registration">Sign Up !</NavLink>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
