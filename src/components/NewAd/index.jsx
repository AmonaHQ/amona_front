import React, { useState } from "react";
import Footer from "../Commons/footer";
import Header from "../Commons/header";
import Details from "./details";
import Pictures from "./pictures";
import Payment from "./payment";

const NewAd = () => {
  const [steps] = useState([<Details />, <Pictures />, <Payment />]);
  const [step] = useState(0);
  return (
    <div className="new-ad">
      <Header />

      <div className="new-ad__steps">
        <div className="new-ad__steps__step">Details</div>
        <div className="new-ad__steps__step">Photos</div>
        <div className="new-ad__steps__step">Payment</div>
        <div className="new-ad__steps__step">Finish</div>
      </div>

      <div className="register__main new-ad__main">{steps[step]}</div>
      <div className="register__sidebar new-ad__sidebar">
        <div className="register__sidebar__info new-ad__sidebar__info">
          <i class="far fa-images"></i>
          <h2>Post a Free Classified</h2>
          <p>
            Do you have a vehicle to sell, to rent, any automobile related
            service to offer? Post it at CheapCARS.ng™, its free, for local
            business and very easy to use!{" "}
          </p>
        </div>{" "}
      </div>
      <Footer />
    </div>
  );
};

export default NewAd;
