import React, { useState, useEffect, useRef } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useRecoilState } from "recoil";
import { menuState } from "../../recoil/atoms";
import { currentUserDetails } from "../../recoil/selectors";
import { loginState, loginModalState, userDetailsState } from "../../recoil/atoms";
import logo from "../../assets/img/cheapcars.png";
import Overlay from "./overlay";
import { useAuthToken, verifyToken } from "../../token";
import { useRecoilValue } from "recoil";

const Header = (props) => {
  const [checked, setChecked] = useState(false);
  const [modalShow, setModalShow] = useRecoilState(loginModalState);
  const [showHeader, setShowHeader] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [authToken, , eraseCookie] = useAuthToken();
  const [menuChecked, setMenuChecked] = useState(false);
  const [firstName, setFirstName] = useState("User");
  const [user] = useRecoilState(userDetailsState);
  const [, setMenu] = useRecoilState(menuState);
  const [height] = useState(isLoggedIn || authToken ? "49rem" : "15rem");

  const listRef = useRef();
  const resetShow = () => {
    setModalShow(false);
  };
  const logOut = () => {
    eraseCookie();
    setIsLoggedIn(false);
    localStorage.setItem("authToken", null);
  };
  const changeMenu = (menu) => {
    setMenuChecked(false);
    setMenu(menu);
  };
  const getName = async () => {
    const name = await verifyToken(authToken);
    if (name && name.success) {
      setFirstName(name.firstName);
    }
  };
  if (firstName === "User" && authToken) {
    getName();
  }

  useEffect(() => {
    window.addEventListener("scroll", (event) => {
      let scrollHeight = window.pageYOffset;
      if (scrollHeight > 300) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
    });
  }, []);
  return (
    <header className={`header  ${showHeader ? "header--sticky" : ""}`}>
      <figure className="header__logo">
        <NavLink to="/">
          <img src={logo} alt="Logo" className="header__logo__img" />
        </NavLink>
      </figure>

      <nav className="header__nav">
        {!isLoggedIn && !authToken ? (
          <ul className="header__nav__list">
            <li
              className="header__nav__item"
              onClick={() => setModalShow(true)}
            >
              <i className="fa fa-user"></i> <span>Log In</span>
            </li>
            <li className="header__nav__item">
              <NavLink to="/registration">
                <i className="fa fa-user"></i> <span>Register</span>
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul className="header__nav__list">
            <li className="header__nav__item" onClick={logOut}>
              <NavLink to="/">
                <i class="fas fa-sign-out-alt"></i> <span>Log Out</span>
              </NavLink>
            </li>
            <input type="checkbox" id="user" checked={menuChecked} />
            <label htmlFor="user" className="user-options">
              <li
                className="header__nav__item"
                onClick={() => setMenuChecked(!menuChecked)}
              >
                <i className="fa fa-user"></i>{" "}
                <span>{user.firstName || firstName}</span>
              </li>

              <ul className="header__nav__user__list">
                <li
                  className="header__nav__user__item"
                  onClick={() => changeMenu({ index: 0 })}
                >
                  <NavLink to="/account">
                    <i className="fa fa-home"></i> <span>Personal Home</span>
                  </NavLink>
                </li>
                <li
                  className="header__nav__user__item"
                  onClick={() => changeMenu({ index: 1 })}
                >
                  <NavLink to="/account">
                    <i className="far fa-images"></i> <span>My Ads</span>
                  </NavLink>
                </li>
                <li className="header__nav__user__item">
                  <i class="fas fa-heart"></i> <span>Favorite ads</span>{" "}
                </li>
                <li className="header__nav__user__item">
                  <i class="fas fa-star"></i>
                  <span>Saved searches</span>
                </li>
                <li className="header__nav__user__item">
                  <i class="fas fa-hourglass-start"></i>
                  <span>Pending approval</span>
                </li>
                <li className="header__nav__user__item">
                  <i class="fas fa-folder"></i>
                  <span>Archived ads</span>
                </li>
                <li className="header__nav__user__item">
                  <i class="fas fa-envelope"></i>
                  <span>Conversations</span>
                </li>
                <li className="header__nav__user__item">
                  <i class="fas fa-dollar-sign"></i>
                  <span>Transactions</span>
                </li>
                <li className="header__nav__user__item">
                  <i class="fas fa-times-circle"></i>
                  <span>Close account</span>
                </li>
              </ul>
            </label>
          </ul>
        )}

        <div className="region__city__button">
          <NavLink to="/ads/new">
            {" "}
            <button className="post-ad region__city__button--header">
              <i className="post-ad__icon fa fa-plus-circle"></i> Post Ad FREE
            </button>
          </NavLink>
        </div>
      </nav>

      <nav className="header__nav__mobile">
        <input
          type="checkbox"
          className="header__nav__mobile__checkbox"
          id="nav-mobile"
          checked={checked}
        />
        <label
          htmlFor="nav-mobile"
          className="header__nav__mobile__label"
          onClick={() => setChecked(!checked)}
        >
          <button className="header__nav__mobile__button"></button>
        </label>

        <ul
          className="header__nav__mobile__list"
          ref={listRef}
          style={{ height: checked ? height : 0 }}
        >
          {!isLoggedIn && !authToken && (
            <div
              className="region__city__button"
              onClick={() => setModalShow(true)}
            >
              <button className="post-ad region__city__button--login">
                <i className="post-ad__icon fa fa-plus-circle"></i> Login
              </button>
            </div>
          )}
          {(isLoggedIn || authToken) && (
            <ul className="header__nav__user__list--mobile">
              <li className="header__nav__user__item">
                <i className="fa fa-home"></i> <span>Personal Home</span>
              </li>
              <li className="header__nav__user__item">
                <i class="far fa-images"></i> <span>My ads</span>{" "}
              </li>
              <li className="header__nav__user__item">
                <i class="fas fa-heart"></i> <span>Favorite ads</span>{" "}
              </li>
              <li className="header__nav__user__item">
                <i class="fas fa-star"></i>
                <span>Saved searches</span>
              </li>
              <li className="header__nav__user__item">
                <i class="fas fa-hourglass-start"></i>
                <span>Pending approval</span>
              </li>
              <li className="header__nav__user__item">
                <i class="fas fa-folder"></i>
                <span>Archived ads</span>
              </li>
              <li className="header__nav__user__item">
                <i class="fas fa-envelope"></i>
                <span>Conversations</span>
              </li>
              <li className="header__nav__user__item">
                <i class="fas fa-dollar-sign"></i>
                <span>Transactions</span>
              </li>
              <li className="header__nav__user__item">
                <i class="fas fa-times-circle"></i>
                <span>Close account</span>
              </li>
              <li className="header__nav__user__item" onClick={logOut}>
                <NavLink to="/">
                  <i class="fas fa-sign-out-alt"></i>
                  <span>Log Out</span>
                </NavLink>
              </li>
            </ul>
          )}

          <div className="region__city__button">
            <NavLink to="/ads/new">
              <button className="post-ad region__city__button--smallest-screen">
                <i className="post-ad__icon fa fa-plus-circle"></i> Post Ad FREE
              </button>
            </NavLink>
          </div>
        </ul>
      </nav>
      <Overlay show={modalShow} resetShow={resetShow} />
    </header>
  );
};

export default Header;
