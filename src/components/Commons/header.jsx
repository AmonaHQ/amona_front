import React, { useState, useEffect, useRef } from "react";
import logo from "../../assets/img/cheapcars.png";
import Overlay from "./overlay";
const Header = (props) => {
  const [checked, setChecked] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [isLoggedIn] = useState(false);
  const [height] = useState(isLoggedIn ? "49rem" : "15rem");

  const listRef = useRef();
  const resetShow = () => {
    setModalShow(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", (event) => {
      let scrollHeight = window.pageYOffset;
      if (scrollHeight > 300) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
    });

    const listHeight = listRef.current.clientHeight;
    console.log("list", listHeight);
  }, []);
  return (
    <header className={`header  ${showHeader ? "header--sticky" : ""}`}>
      <figure className="header__logo">
        <a href="/">
          <img src={logo} alt="Logo" className="header__logo__img" />
        </a>
      </figure>

      <nav className="header__nav">
        {!isLoggedIn ? (
          <ul className="header__nav__list">
            <li
              className="header__nav__item"
              onClick={() => setModalShow(true)}
            >
              <i className="fa fa-user"></i> <span>Log In</span>
            </li>
            <li className="header__nav__item">
              <a href="/" className="header__nav__link">
                <i className="fa fa-user"></i> <span>Register</span>
              </a>
            </li>
          </ul>
        ) : (
          <ul className="header__nav__list">
            <li className="header__nav__item">
              <a href="/" className="header__nav__link">
                <i class="fas fa-sign-out-alt"></i> <span>Log Out</span>
              </a>
            </li>
            <input type="checkbox" id="user" />
            <label htmlFor="user" className="user-options">
              <li className="header__nav__item">
                <i className="fa fa-user"></i> <span>Christian</span>
              </li>

              <ul className="header__nav__user__list">
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
              </ul>
            </label>
          </ul>
        )}

        <div className="region__city__button">
          <button className="post-ad region__city__button--header">
            <i className="post-ad__icon fa fa-plus-circle"></i> Post Ad FREE
          </button>
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
          {!isLoggedIn && (
            <div
              className="region__city__button"
              onClick={() => setModalShow(true)}
            >
              <button className="post-ad region__city__button--login">
                <i className="post-ad__icon fa fa-plus-circle"></i> Login
              </button>
            </div>
          )}
          {isLoggedIn && (
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
              <li className="header__nav__user__item">
                <i class="fas fa-sign-out-alt"></i>
                <span>Log Out</span>
              </li>
            </ul>
          )}

          <div className="region__city__button">
            <button className="post-ad region__city__button--smallest-screen">
              <i className="post-ad__icon fa fa-plus-circle"></i> Post Ad FREE
            </button>
          </div>
        </ul>
      </nav>
      <Overlay show={modalShow} resetShow={resetShow} />
    </header>
  );
};

export default Header;
