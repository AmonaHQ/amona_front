import React, { useState } from "react";
import SunEditor from "suneditor-react";
import ReCAPTCHA from "react-google-recaptcha";
import Autocomplete from "react-google-autocomplete";
import { useRecoilState } from "recoil";
import buttonList from "../../constants/button-list";
import DropSearch from "../Commons/drop-search";
import Features from "../Commons/features";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import {
  useGetVehicleMake,
  useGetVehicleModel,
} from "../../services/cars.service";
import {
  vehicleModelState,
  busyOverlayState,
  detailsState,
  adDetailsProgressState,
  errorMessageState,
} from "../../recoil/atoms";
import {
  useCategoriesQuery,
  useSellerDetailsQuery,
} from "../../operations/queries";
import {
  year,
  transmission,
  fuelType,
  numberOfDoors,
  condition,
  drive,
  interiorColor,
  exteriorColor,
  carFeatures,
} from "../../constants/ad-details";

import ScrollTop from "../../utilities/scroll-top";

const Details = () => {
  const [, setErrorMessage] = useRecoilState(errorMessageState);
  const [getMake] = useGetVehicleMake();
  const [getModel] = useGetVehicleModel();
  const [model, setModel] = useRecoilState(vehicleModelState);
  const [details, setDetails] = useRecoilState(detailsState);
  const [inputs, setInputs] = useState({});
  const [, setStep] = useRecoilState(adDetailsProgressState);
  const [description, setDescription] = useState("");
  const { loading, data } = useCategoriesQuery();
  const seller = useSellerDetailsQuery();
  const [, setIsBusy] = useRecoilState(busyOverlayState);
  const getVehicleMake = async (keyword) => {
    return await getMake(keyword);
  };

  if (loading || seller.loading) {
    setIsBusy(true);
  } else {
    setIsBusy(false);
  }
  const handleMakeSelection = async (make, identifier, name) => {
    handleSelect(make, identifier, name);
    const model = await getModel(make.Make_ID);
    if (model) {
      setModel(model);
    }
  };

  const handleSelect = (input, identifier, name, convert) => {
    const value = input[identifier].trim();
    const allDetails = { ...details };
    allDetails[name] = convert ? convert(value) : value;
    setDetails(allDetails);

    const allInputs = { ...inputs };
    allInputs[name] = input;
    setInputs(allInputs);
  };

  const handleChange = (event) => {
    const convertInput = {
      integer: (input) => {
        return parseInt(input, 10);
      },
    };

    const inputType = event.target.getAttribute("inputType");
    const allDetails = { ...details };
    let value = event.target.value;
    if (inputType) {
      value = convertInput[inputType](value);
    }
    allDetails[event.target.name] =
      event.target.name === "hidePhoneNumber" ||
      event.target.name === "negotiable"
        ? event.target.checked
        : value;
    setDetails(allDetails);
  };
  const handleDescriptionChange = (content) => {
    setDescription(content);
  };
  const extractLocation = (place) => {
    const {
      place_id,
      address_components,
      geometry: {
        location: { lat, lng },
      },
      formatted_address,
    } = place;
    const country = address_components.filter((component) =>
      component.types.includes("country")
    );
    const countryName = country[0].long_name;
    const state = address_components.filter((component) =>
      component.types.includes("administrative_area_level_1")
    );
    const stateName = state[0].long_name;

    const location = {
      place_id,
      formatted_address,
      lat: lat(),
      lng: lng(),
      countryName,
      stateName,
    };

    const allDetails = { ...details };
    allDetails.location = location;
    setDetails(allDetails);
  };

  const findEmptyFields = () => {
    const requiredFields = [
      { name: "Category", value: "category" },
      { name: "Title", value: "title" },
      { name: "Make", value: "make" },
      { name: "Model", value: "model" },
      { name: "Year", value: "year" },
      { name: "Condition", value: "condition" },
      { name: "Mileage", value: "mileage" },
      { name: "Location", value: "location" },
      { name: "Price", value: "price" },
      { name: "Phone", value: "phoneNumber" },
    ];
    const emptyFields = [];
    requiredFields.forEach((field) => {
      let foundField = details[field.value];
      if (!foundField && !emptyFields.includes(field.name)) {
        emptyFields.push(field.name);
      }
      if (
        typeof foundField === "string" &&
        !foundField.length &&
        !emptyFields.includes(field.name)
      ) {
        emptyFields.push(field.name);
      }
    });
    if (!description || !description.length) emptyFields.unshift("Description");
    return emptyFields.length
      ? {
          success: false,
          emptyFields: (
            <ul>
              {emptyFields.map((field) => (
                <li>
                  <i className="fa fa-check"></i>{" "}
                  <span>{`${field} is required`}</span>
                </li>
              ))}
            </ul>
          ),
        }
      : {
          success: true,
        };
  };

  const handleNext = () => {
    const validateFields = findEmptyFields();
    console.log("is empty", validateFields);

    if (validateFields.success) {
      const allDetails = { ...details };
      allDetails.description = description;
      setDetails(allDetails);
      setStep(1);
      setErrorMessage({ success: true });
    } else {
      setErrorMessage(validateFields);
      window.scrollTo(0, 0);
    }
  };
  return (
    <>
      {" "}
      <ScrollTop />
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
              name="category"
              onSelect={handleSelect}
              data={data ? data.categories.categories : []}
              inputId="category"
              showItems={true}
              placeholder="Choose category"
              value={{ title: details.category }}
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
              name="title"
              value={details.title}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="formGroup">
          <label htmlFor="" className="formGroup__label">
            Description
          </label>
          <SunEditor
            onChange={handleDescriptionChange}
            name="my-editor"
            placeholder="Describe what makes your ad unique"
            setContents={details.description}
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
              name="make"
              identifier="Make_Name"
              onSelect={handleMakeSelection}
              handleChange={getVehicleMake}
              inputId="make"
              placeholder="Select"
              showItems={true}
              async={true}
              onChange={getVehicleMake}
              value={{ Make_Name: details.make }}
            />
          </div>
        </div>
        <div className="formGroup">
          <label htmlFor="model" className="formGroup__label">
            Model
          </label>
          <div className="formGroup__inputs__single formGroup__inputs__single--drop-search">
            <DropSearch
              name="model"
              onSelect={handleSelect}
              identifier="Model_Name"
              data={model}
              inputId="model"
              placeholder="Select"
              disable={!model.length}
              showItems={true}
              value={{ Model_Name: details.model }}
            />
          </div>
        </div>
        <div className="formGroup">
          <label htmlFor="year" className="formGroup__label">
            Year
          </label>
          <div className="formGroup__inputs__single formGroup__inputs__single--drop-search">
            <DropSearch
              name="year"
              onSelect={handleSelect}
              identifier="year"
              data={year}
              inputId="year"
              placeholder="Select"
              showItems={true}
              inputType="integer"
              value={{ year: details.year }}
            />
          </div>
        </div>
        <div className="formGroup">
          <label htmlFor="condition" className="formGroup__label">
            Condition
          </label>
          <div className="formGroup__inputs__single formGroup__inputs__single--drop-search">
            <DropSearch
              name="condition"
              onSelect={handleSelect}
              identifier="condition"
              data={condition}
              inputId="condition"
              placeholder="Select"
              showItems={true}
              value={{ condition: details.condition }}
            />
          </div>
        </div>
        <div className="formGroup">
          <label htmlFor="" className="formGroup__label">
            Mileage
          </label>
          <div className="formGroup__inputs__single">
            <input
              type="number"
              className="formGroup__input"
              placeholder="Mileage (km)"
              name="mileage"
              value={details.mileage}
              onChange={handleChange}
              inputType="integer"
            />
          </div>
        </div>
        <div className="formGroup">
          <label htmlFor="" className="formGroup__label">
            Location
          </label>

          <div className="formGroup__inputs__single">
            <Autocomplete
              style={{ width: "90%" }}
              onPlaceSelected={(place) => {
                extractLocation(place);
              }}
              types={["geocode"]}
              componentRestrictions={{ country: "ng" }}
              onChange={() => {
                const allDetails = { ...details };
                allDetails.location = null;
                setDetails(allDetails);
              }}
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
              name="price"
              value={details.price}
              onChange={handleChange}
              inputType="integer"
            />
            <div className="formGroup__inputs__tripple__check">
              <input
                className="formGroup__inputs__tripple__checkbox"
                type="checkbox"
                name="negotiable"
                onChange={handleChange}
                checked={details.negotiable}
              />
              <label htmlFor="" className="formGroup__inputs__tripple__label">
                Negotiable
              </label>
            </div>
          </div>
        </div>
        <div className="form__heading">
          <i class="fas fa-user"></i>
          <h2 className="h2"> Contact Information</h2>
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
              value={details.phoneNumber}
              onChange={handleChange}
            />
            <div className="formGroup__inputs__tripple__check">
              <input
                className="formGroup__inputs__tripple__checkbox"
                type="checkbox"
                name="hidePhoneNumber"
                onChange={handleChange}
                id="hide-phone"
                checked={details.hidePhoneNumber}
              />
              <label
                htmlFor="hide-phone"
                className="formGroup__inputs__tripple__label"
              >
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
              name="email"
              value={details.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="additional-details">
          <input type="checkbox" id="additional-details" />
          <label htmlFor="additional-details">
            <div className="additional-details__heading">
              <i className="fa fa-chevron-down"></i>
              <h2>Additional Details</h2>
              <span>(Optional)</span>
            </div>
          </label>
          <div className="additional-details__body">
            <div className="formGroup">
              <label htmlFor="transmission" className="formGroup__label">
                Transmission
              </label>
              <div className="formGroup__inputs__single formGroup__inputs__single--drop-search">
                <DropSearch
                  name="transmission"
                  onSelect={handleSelect}
                  identifier="transmission"
                  data={transmission}
                  inputId="transmission"
                  placeholder="Select"
                  showItems={true}
                  value={{ transmission: details.transmission }}
                />
              </div>
            </div>{" "}
            <div className="formGroup">
              <label htmlFor="no-of-doors" className="formGroup__label">
                Nos of Doors
              </label>
              <div className="formGroup__inputs__single formGroup__inputs__single--drop-search">
                <DropSearch
                  name="numberOfDoors"
                  onSelect={handleSelect}
                  identifier="numberOfDoors"
                  data={numberOfDoors}
                  inputId="no-of-doors"
                  placeholder="Select"
                  showItems={true}
                  value={{ numberOfDoors: details.numberOfDoors }}
                />
              </div>
            </div>
            <div className="formGroup">
              <label htmlFor="fuel-type" className="formGroup__label">
                Fuel Type
              </label>
              <div className="formGroup__inputs__single formGroup__inputs__single--drop-search">
                <DropSearch
                  name="fuelType"
                  onSelect={handleSelect}
                  identifier="fuelType"
                  data={fuelType}
                  inputId="fuel-type"
                  placeholder="Select"
                  showItems={true}
                  value={{ fuelType: details.fuelType }}
                />
              </div>
            </div>
            <div className="formGroup">
              <label htmlFor="drive" className="formGroup__label">
                Drive
              </label>
              <div className="formGroup__inputs__single formGroup__inputs__single--drop-search">
                <DropSearch
                  name="drive"
                  onSelect={handleSelect}
                  identifier="drive"
                  data={drive}
                  inputId="drive"
                  placeholder="Select"
                  showItems={true}
                  value={{ drive: details.drive }}
                />
              </div>
            </div>
            <div className="formGroup">
              <label htmlFor="interior-color" className="formGroup__label">
                Interior Color
              </label>
              <div className="formGroup__inputs__single formGroup__inputs__single--drop-search">
                <DropSearch
                  name="interiorColor"
                  onSelect={handleSelect}
                  identifier="interiorColor"
                  data={interiorColor}
                  inputId="interior-color"
                  placeholder="Select"
                  showItems={true}
                  value={{ interiorColor: details.interiorColor }}
                />
              </div>
            </div>
            <div className="formGroup">
              <label htmlFor="exterior-color" className="formGroup__label">
                Exterior Color
              </label>
              <div className="formGroup__inputs__single formGroup__inputs__single--drop-search">
                <DropSearch
                  name="exteriorColor"
                  onSelect={handleSelect}
                  identifier="exteriorColor"
                  data={exteriorColor}
                  inputId="exterior-color"
                  placeholder="Select"
                  showItems={true}
                  value={{ exteriorColor: details.exteriorColor }}
                />
              </div>
            </div>
            <div className="formGroup">
              <label htmlFor="exterior-color" className="formGroup__label">
                Features
              </label>
              <div className="features">
                <Features
                  data={carFeatures}
                  onSelect={(feature) => {
                    const allDetails = { ...details };
                    const { features } = allDetails;
                    if (!features || !features.length) {
                      const allFeatures = [];
                      allFeatures.push(feature);
                      allDetails.features = allFeatures;
                      setDetails(allDetails);
                    } else {
                      const allFeatures = [...details.features];
                      const isExists = allFeatures.filter(
                        (foundFeature) => foundFeature === feature
                      );
                      const allDetails = { ...details };
                      if (!isExists.length) {
                        allFeatures.push(feature);
                        allDetails.features = allFeatures;
                        setDetails(allDetails);
                      } else {
                        const filteredFeatures = allFeatures.filter(
                          (foundFeature) => foundFeature !== feature
                        );
                        allDetails.features = filteredFeatures;
                        setDetails(allDetails);
                      }
                    }
                  }}
                  value={details.features}
                />
              </div>
            </div>{" "}
            <div className="formGroup">
              <label htmlFor="" className="formGroup__label">
                Video Link
              </label>
              <div className="formGroup__inputs__double">
                <i class="fas fa-link"></i>
                <input
                  type="text"
                  className="formGroup__input"
                  placeholder="Video Link"
                  name="videoLink"
                  value={details.videoLink}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="form__captcha">
          <ReCAPTCHA
            sitekey="6LdEVBsaAAAAAHx5BRsT0nG5Pm5kBFXGKYxq5ULu"
            onChange={(value) => {}}
          />
        </div>
        <button type="button" className="form__button" onClick={handleNext}>
          Next
        </button>
      </form>
    </>
  );
};

export default Details;
