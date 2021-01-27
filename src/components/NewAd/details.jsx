import React, { useEffect } from "react";
import SunEditor from "suneditor-react";
import ReCAPTCHA from "react-google-recaptcha";
import Autocomplete from "react-google-autocomplete";
import { useRecoilState } from "recoil";
import buttonList from "../../constants/button-list";
import DropSearch from "../Commons/drop-search";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import {
  useGetVehicleMake,
  useGetVehicleModel,
} from "../../services/cars.service";
import { vehicleMakeState, vehicleModelState } from "../../recoil/atoms";
import spring from "../../svgs/spring.svg";
import { categoriesWithIcons } from "../../constants/categories";

const Details = () => {
  const [getMake] = useGetVehicleMake();
  const [getModel] = useGetVehicleModel();
  const [make] = useRecoilState(vehicleMakeState);
  const [model, setModel] = useRecoilState(vehicleModelState);

  const getVehicleMake = async (keyword) => {
    return await getMake(keyword);
  };

  const handleMakeSelection = async (make) => {
    const model = await getModel(make.Make_ID);
    console.log("it is a model", model);
    if (model) {
      setModel(model);
    }
  };

  useEffect(() => {
    getVehicleMake("toy");
  }, []);
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
          <div className="formGroup__inputs__single formGroup__inputs__single--drop-search">
            <DropSearch
              identifier="title"
              onSelect={() => {}}
              data={categoriesWithIcons}
              inputId="category"
              showItems={true}
              placeholder="Choose category"
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
          <label htmlFor="make" className="formGroup__label">
            Make
          </label>
          <div className="formGroup__inputs__single formGroup__inputs__single--drop-search">
            <DropSearch
              identifier="Make_Name"
              onSelect={(item) => handleMakeSelection(item)}
              handleChange={getVehicleMake}
              data={make}
              inputId="make"
              placeholder="Select vehicle make"
            />
          </div>
        </div>
        <div className="formGroup">
          <label htmlFor="model" className="formGroup__label">
            Model
          </label>
          <div className="formGroup__inputs__single formGroup__inputs__single--drop-search">
            <DropSearch
              identifier="Model_Name"
              onSelect={(item) => handleMakeSelection(item)}
              data={model}
              inputId="model"
              placeholder="Select vehicle model"
              disable={!model.length}
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
        </div>{" "}
        <div className="formGroup">
          <label htmlFor="" className="formGroup__label">
            City
          </label>

          <div className="formGroup__inputs__single">
            <Autocomplete
              style={{ width: "90%" }}
              onPlaceSelected={(place) => {
                console.log(place);
              }}
              types={["geocode"]}
              componentRestrictions={{ country: "ng" }}
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
