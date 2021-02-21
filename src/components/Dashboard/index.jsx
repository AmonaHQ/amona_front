import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { currentMenuState } from "../../recoil/selectors";

import Header from "../Commons/header";
import Footer from "../Commons/footer";
import PersonalHome from "./PersonalHome";
import MyAds from "./my-ads";
import Transactions from "./transactions";
import Sidebar from "./sidebar";
import ScrollTop from "../../utilities/scroll-top";

const Dashboard = () => {
  const menu = useRecoilValue(currentMenuState);
  const [screens] = useState([
    <PersonalHome />,
    <MyAds />,
    ,
    ,
    ,
    ,
    <Transactions />,
  ]);

  useEffect(() => {
    localStorage.setItem("authToken", null);
  }, []);

  return (
    <div className="dashboard">
      <Header />
      <Sidebar />
      <div className="dashboard__main">
        <div className="dashboard__main__fancy-line"></div>

        {screens[menu.index]}
      </div>

      <Footer />
      <ScrollTop />
    </div>
  );
};

export default Dashboard;
