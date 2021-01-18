import React, { useEffect, useState, useRef } from "react";
import { useRecoilState } from "recoil";
import { menuState } from "../../recoil/atoms";

const Sidebar = () => {
  const accountRef = useRef();
  const myAdsRef = useRef();
  const terminateRef = useRef();
  const [accountHeight, setAccountHeight] = useState({});
  const [myAdsHeight, setMyAdsHeight] = useState({});
  const [terminateHeight, setTerminateHeight] = useState({});
  const [, setMenu] = useRecoilState(menuState);

  useEffect(() => {
    const account = accountRef.current.clientHeight;
    const myAds = myAdsRef.current.clientHeight;
    const terminate = terminateRef.current.clientHeight;

    setAccountHeight({ initial: account, new: null });
    setMyAdsHeight({ initial: myAds, new: null });
    setTerminateHeight({ initial: terminate, new: null });

    localStorage.setItem("authToken", null);
  }, []);
  return (
    <div className="dashboard__sidebar">
      <div className="dashboard__sidebar__section">
        <div
          className="dashboard__sidebar__section__title"
          onClick={() => {
            if (accountHeight.initial > 0) {
              setAccountHeight({ initial: 0, new: accountHeight.initial });
            } else {
              setAccountHeight({ initial: accountHeight.new });
            }
          }}
        >
          <h2>My Account</h2>{" "}
          <i
            className={`fa fa-chevron-right dashboard__sidebar__section__title__icon ${
              accountHeight.initial > 0 &&
              "dashboard__sidebar__section__title__icon--open"
            }`}
          ></i>
        </div>
        <ul
          ref={accountRef}
          className="dashboard__sidebar__section__list account"
          id="account"
          style={{ height: accountHeight.initial, overflow: "hidden" }}
        >
          <li
            className="dashboard__sidebar__section__item dashboard__sidebar__section__item--home"
            onClick={() =>
              setMenu({
                index: 0,
                title: "Personal Home",
              })
            }
          >
            <i className="fa fa-home"></i> <span>Personal Home</span>
          </li>
        </ul>
      </div>
      <div className="dashboard__sidebar__section">
        <div
          className="dashboard__sidebar__section__title"
          onClick={() => {
            if (myAdsHeight.initial > 0) {
              setMyAdsHeight({ initial: 0, new: myAdsHeight.initial });
            } else {
              setMyAdsHeight({ initial: myAdsHeight.new });
            }
          }}
        >
          <h2>My Ads</h2>{" "}
          <i
            className={`fa fa-chevron-right dashboard__sidebar__section__title__icon ${
              myAdsHeight.initial > 0 &&
              "dashboard__sidebar__section__title__icon--open"
            }`}
          ></i>
        </div>
        <ul
          className="dashboard__sidebar__section__list"
          ref={myAdsRef}
          style={{ height: myAdsHeight.initial, overflow: "hidden" }}
        >
          <li
            className="dashboard__sidebar__section__item"
            onClick={() =>
              setMenu({
                index: 1,
                title: "My Ads",
              })
            }
          >
            <i class="far fa-images"></i> <span>My ads</span>{" "}
            <span className="dashboard__sidebar__section__item__count">0</span>
          </li>
          <li className="dashboard__sidebar__section__item">
            <i class="fas fa-heart"></i> <span>Favorite ads</span>{" "}
            <span className="dashboard__sidebar__section__item__count">0</span>
          </li>
          <li className="dashboard__sidebar__section__item">
            <i class="fas fa-star"></i>
            <span>Saved searches</span>{" "}
            <span className="dashboard__sidebar__section__item__count">0</span>
          </li>
          <li className="dashboard__sidebar__section__item">
            <i class="fas fa-hourglass-start"></i>
            <span>Pending approval</span>{" "}
            <span className="dashboard__sidebar__section__item__count">0</span>
          </li>
          <li className="dashboard__sidebar__section__item">
            <i class="fas fa-folder"></i>
            <span>Archived ads</span>{" "}
            <span className="dashboard__sidebar__section__item__count">0</span>
          </li>
          <li className="dashboard__sidebar__section__item">
            <i class="fas fa-envelope"></i>
            <span>Conversations</span>
            <span className="dashboard__sidebar__section__item__count">0</span>
          </li>
          <li className="dashboard__sidebar__section__item">
            <i class="fas fa-dollar-sign"></i>
            <span>Transactions</span>
            <span className="dashboard__sidebar__section__item__count">0</span>
          </li>
        </ul>
      </div>
      <div className="dashboard__sidebar__section">
        <div
          className="dashboard__sidebar__section__title"
          onClick={() => {
            if (terminateHeight.initial > 0) {
              setTerminateHeight({
                initial: 0,
                new: terminateHeight.initial,
              });
            } else {
              setTerminateHeight({ initial: terminateHeight.new });
            }
          }}
        >
          <h2>Terminate Account</h2>{" "}
          <i
            className={`fa fa-chevron-right dashboard__sidebar__section__title__icon ${
              terminateHeight.initial > 0 &&
              "dashboard__sidebar__section__title__icon--open"
            }`}
          ></i>
        </div>
        <ul
          className="dashboard__sidebar__section__list"
          ref={terminateRef}
          style={{ height: terminateHeight.initial, overflow: "hidden" }}
        >
          <li className="dashboard__sidebar__section__item dashboard__sidebar__section__item">
            <i class="fas fa-times-circle"></i>
            <span>Close account</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;
