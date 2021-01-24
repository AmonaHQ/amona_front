import React from "react";
import SunEditor from "suneditor-react";
import ReCAPTCHA from "react-google-recaptcha";
import buttonList from "../../constants/button-list";
import DropSearch from "../Commons/drop-search";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

import { make } from "../../constants/search";
const Details = () => {
  return (
    <>
      <div className="register__main__heading">
        <i class="far fa-image"></i> <h1 className="h1"> Post Free Ads</h1>
      </div>

      <form action="" className="form form--new-ad">
        <div className="formGroup">
          <label htmlFor="" className="formGroup__label">
            Category
          </label>
          <div className="formGroup__inputs__double">
            <i className="fa fa-user"></i>
            <input
              type="text"
              className="formGroup__input"
              placeholder="Select Vehicle Type"
            />
          </div>
        </div>
        <div className="formGroup">
          <label htmlFor="" className="formGroup__label">
            Title
          </label>
          <div className="formGroup__inputs__double">
            <i className="fa fa-user"></i>
            <input
              type="text"
              className="formGroup__input"
              placeholder="Enter Your Ad Title"
            />
          </div>
        </div>
        <div className="formGroup">
          <label htmlFor="" className="formGroup__label">
            Description
          </label>
          <SunEditor
            // onChange={(content) => setJobDescription(content)}
            name="my-editor"
            placeholder="Describe what makes your ad unique"
            // setContents={initialDescription}
            height="40rem"
            setDefaultStyle="font-family: cursive; font-size: 16px;"
            setOptions={{
              buttonList,
            }}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="" className="formGroup__label">
            Make
          </label>
          <div className="formGroup__inputs__single formGroup__inputs__single--drop-search">
            <DropSearch
              data={make}
              identifier="make"
              onSelect={(item) => console.log("selected", item)}
            />
          </div>
        </div>
        <div className="formGroup">
          <label htmlFor="" className="formGroup__label">
            Price
          </label>
          <div className="formGroup__inputs__tripple">
            <i class="">₦</i>
            <input
              type="text"
              className="formGroup__input"
              placeholder="e.g 1500"
            />
            <div className="formGroup__inputs__tripple__check">
              <input
                className="formGroup__inputs__tripple__checkbox"
                type="checkbox"
              />
              <label htmlFor="" className="formGroup__inputs__tripple__label">
                Negotiable
              </label>
            </div>
          </div>
        </div>
        <div className="formGroup">
          <label htmlFor="" className="formGroup__label">
            City
          </label>
          <div className="formGroup__inputs__double">
            <i class="fas fa-map-marker"></i>
            <input
              type="text"
              className="formGroup__input"
              placeholder="Select City"
            />
          </div>
        </div>
        <div className="formGroup">
          <label htmlFor="" className="formGroup__label">
            Tags
          </label>
          <div className="formGroup__inputs__double">
            <i class="fas fa-tag"></i>
            <input
              type="text"
              className="formGroup__input"
              placeholder="add a tag"
            />
          </div>
        </div>

        <div className="form__heading">
          <i class="fas fa-user"></i>
          <h2 className="h2"> Seller information</h2>
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
            />
            <div className="formGroup__inputs__tripple__check">
              <input
                className="formGroup__inputs__tripple__checkbox"
                type="checkbox"
              />
              <label htmlFor="" className="formGroup__inputs__tripple__label">
                Hide
              </label>
            </div>
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
            />
          </div>
        </div>

        <div className="form__captcha">
          <ReCAPTCHA
            sitekey="6LdEVBsaAAAAAHx5BRsT0nG5Pm5kBFXGKYxq5ULu"
            onChange={(value) => {}}
          />
        </div>
        <button className="form__button">Submit</button>
      </form>
    </>
  );
};

export default Details;
