import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useRecoilState } from "recoil";
import ReCAPTCHA from "react-google-recaptcha";
import Header from "../../Commons/header";
import Footer from "../../Commons/footer";
import Validator from "../../Commons/validator";
import { useAuthToken } from "../../../token";
import { useRegistrationMutation } from "../../../operations/mutaions";
import { loginState } from "../../../recoil/atoms";

const Registration = () => {
  const [errorMessages, setErrorMessages] = useState({});
  const [showError, setShowError] = useState(true);
  const [disableButton, setDisableButton] = useState(true);
  const [inputData, setInputData] = useState({});
  const [createUser, { loading, error, data }] = useRegistrationMutation();
  const [, setIsLoggedIn] = useRecoilState(loginState);
  const [authToken] = useAuthToken();

  useEffect(() => {}, []);
  const handleChange = (event) => {
    const allData = { ...inputData };
    allData[event.target.name] =
      event.target.name === "hidePhoneNumber"
        ? event.target.checked
        : event.target.value;
    setInputData(allData);
  };

  const handleSubmit = () => {
    setShowError(true);
    const data = { ...inputData };
    delete data.confirmPassword;
    createUser(data);
  };
  if (error) {
    window.scrollTo(0, 0);
  }
  if (data && !error) {
    setIsLoggedIn(true);
    localStorage.setItem("authToken", data.signUp.firstName);
    return <Redirect loggedIn to="/account" />;
  }
  if (authToken) {
    return <Redirect loggedIn to="/account" />;
  }
  return (
    <div className="register">
      <Header />
      {/* {newUser.error && <h1>{newUser.error.graphQLErrors[0].message}</h1>} */}
      <div
        class={`registration-error-message ${
          error && showError && "registration-error-message--show"
        }`}
      >
        <div
          className={`registration-error-message__container ${
            error && showError
              ? "registration-error-message__container--show"
              : "registration-error-message__container--hide"
          }`}
        >
          <div className="registration-error-message__header">
            <h2>Oops ! An error has occurred. Please make some corrections</h2>{" "}
            <i className="fa fa-times" onClick={() => setShowError(false)}></i>
          </div>
          <div className="registration-error-message__content">
            <ul>
              <li>
                <i className="fa fa-check"></i>{" "}
                <span>{error && error.graphQLErrors[0].message}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="register__container">
        <div className="register__main">
          <div className="register__main__heading">
            <i className="fa fa-user"></i>{" "}
            <h1 className="h1"> Create your account, It's 100% free</h1>
          </div>
          <Validator
            setValidationMessage={(errorMessages) =>
              setErrorMessages(errorMessages)
            }
            toggleButtonDisable={(value) => setDisableButton(value)}
          >
            <form action="" className="form">
              <div className="formGroup">
                <label htmlFor="" className="formGroup__label">
                  First Name
                </label>
                <div className="formGroup__inputs__double">
                  <i className="fa fa-user"></i>
                  <input
                    type="text"
                    className="formGroup__input"
                    placeholder="First Name"
                    name="firstName"
                    schema={JSON.stringify({
                      required: true,
                      maxLength: 15,
                      maxWords: 1,
                      label: "First Name",
                    })}
                    value={inputData.firstName}
                    onChange={handleChange}
                  />{" "}
                  <p className="formGroup__alert">
                    {errorMessages.firstNameError}
                  </p>
                </div>
              </div>
              <div className="formGroup">
                <label htmlFor="" className="formGroup__label">
                  Last Name
                </label>
                <div className="formGroup__inputs__double">
                  <i className="fa fa-user"></i>
                  <input
                    type="text"
                    className="formGroup__input"
                    placeholder="Last Name"
                    name="lastName"
                    schema={JSON.stringify({
                      required: true,
                      maxLength: 15,
                      maxWords: 1,
                      label: "Last Name",
                    })}
                    value={inputData.lastName}
                    onChange={handleChange}
                  />{" "}
                  <p className="formGroup__alert">
                    {errorMessages.lastNameError}
                  </p>
                </div>
              </div>
              <div className="formGroup">
                <label htmlFor="" className="formGroup__label">
                  Phone
                </label>
                <div className="formGroup__inputs__tripple">
                  <i class="fas fa-phone"></i>
                  <input
                    type="text"
                    className="formGroup__input"
                    placeholder="Phone"
                    name="phoneNumber"
                    schema={JSON.stringify({
                      required: true,
                      maxLength: 15,
                      minLength: 9,
                      maxWords: 1,
                      label: "Phone Number",
                    })}
                    value={inputData.phoneNumber}
                    onChange={handleChange}
                  />

                  <div className="formGroup__inputs__tripple__check">
                    <input
                      className="formGroup__inputs__tripple__checkbox"
                      type="checkbox"
                      name="hidePhoneNumber"
                      onChange={handleChange}
                      id="hide-phone"
                    />
                    <label
                      htmlFor="hide-phone"
                      className="formGroup__inputs__tripple__label"
                    >
                      Hide
                    </label>
                  </div>
                  <p className="formGroup__alert">
                    {errorMessages.phoneNumberError}
                  </p>
                </div>
              </div>
              <div className="formGroup">
                <label htmlFor="" className="formGroup__label">
                  Email
                </label>
                <div className="formGroup__inputs__double">
                  <i class="fas fa-envelope"></i>
                  <input
                    type="text"
                    className="formGroup__input"
                    placeholder="Email"
                    name="email"
                    schema={JSON.stringify({
                      inputType: "email",
                      required: true,
                      label: "Email",
                    })}
                    value={inputData.email}
                    onChange={handleChange}
                  />
                  <p className="formGroup__alert">{errorMessages.emailError}</p>
                </div>
              </div>
              <div className="formGroup">
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
                    schema={JSON.stringify({
                      required: true,
                      minLength: 8,
                      maxLength: 30,
                      label: "Password",
                    })}
                    value={inputData.password}
                    onChange={handleChange}
                  />{" "}
                  <p className="formGroup__alert formGroup__alert--password">
                    {errorMessages.passwordError}
                  </p>
                </div>
              </div>
              <div className="formGroup">
                <label htmlFor="" className="formGroup__label">
                  Confirm
                </label>
                <div className="formGroup__inputs__double">
                  <i class="fas fa-lock"></i>
                  <input
                    type="password"
                    className="formGroup__input"
                    placeholder="Confirm password"
                    name="confirmPassword"
                    schema={JSON.stringify({
                      required: true,
                      shouldMatch: inputData.password,
                      label: "Passwords",
                    })}
                    value={inputData.confirmPassword}
                    onChange={handleChange}
                  />
                  <p className="formGroup__alert formGroup__alert--password">
                    {errorMessages.confirmPasswordError}
                  </p>
                </div>
              </div>
              {/* <div className="formGroup">
              <label htmlFor="" className="formGroup__label">
                Name
              </label>
              <div className="formGroup__inputs__single">
                <input type="text" className="formGroup__input" />
              </div>
            </div> */}

              <div className="form__captcha ">
                <ReCAPTCHA
                  sitekey="6LdEVBsaAAAAAHx5BRsT0nG5Pm5kBFXGKYxq5ULu"
                  onChange={(value) => {}}
                />
              </div>
              <div className="form__terms">
                <input type="checkbox" />
                <label htmlFor="">
                  {" "}
                  have read and agree to the Terms & Conditions
                </label>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className={`form__button ${loading && "button--clicked"}  ${
                  disableButton ? "disable-element" : ""
                }`}
              >
                <span>Register</span>
              </button>
            </form>{" "}
          </Validator>
        </div>
        <div className="register__sidebar">
          <div className="register__sidebar__info">
            <i class="far fa-images"></i>
            <h2>Post a Free Classified</h2>
            <p>
              Do you have a vehicle to sell, to rent, any automobile related
              service to offer? Post it at CheapCARS.ng™, its free, for local
              business and very easy to use!{" "}
            </p>
          </div>{" "}
          <div className="register__sidebar__info">
            <i class="far fa-edit"></i>
            <h2>Create and Manage Items</h2>
            <p>
              Become a best seller or buyer. Create and Manage your ads. Repost
              your old ads, etc.
            </p>
          </div>{" "}
          <div className="register__sidebar__info">
            <i class="fas fa-heart"></i>
            <h2>Create your Favorite ads list</h2>
            <p>
              Create your Favorite ads list. And save your search. Don't forget
              any deal.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Registration;
