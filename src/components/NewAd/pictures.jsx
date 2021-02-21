import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useDropzone } from "react-dropzone";
import { storage } from "../../firebase/firebase";
import ScrollTop from "../../utilities/scroll-top";
import { adDetailsProgressState, detailsState } from "../../recoil/atoms";
import {
  useCreateCarMutation,
  useUpdateCarMutation,
} from "../../operations/mutations";

import removeTypeName from "../../utilities/remove-typename";

const Details = ({ plan: { price, type, planId, _id } }) => {
  const [canSelect, setCanSelect] = useState(true);
  const [, setStep] = useRecoilState(adDetailsProgressState);
  const [details, setDetails] = useRecoilState(detailsState);
  const [createCar, { error, data }] = useCreateCarMutation();
  const [updateCar] = useUpdateCarMutation();
  const [images, setImages] = useState(details.pictures || []);

  const onDrop = (acceptedFiles) => {
    const allImages = [...images];
    allImages.push("loading");
    setImages(allImages);
    const dragArea = document.getElementById("drag-area");
    dragArea.scrollLeft = dragArea.scrollWidth;
    const file = acceptedFiles[0];
    const uploadTask = storage.ref(`/images/${file.name}`).put(file);
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        const progress =
          Math.round(snapShot.bytesTransferred / snapShot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (err) => {
        console.log(err);
      },
      () => {
        storage
          .ref("images")
          .child(file.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            console.log("image url", fireBaseUrl);

            const allImages = [...images];
            allImages.push(fireBaseUrl);

            setImages(allImages);
          });
      }
    );
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const handleDelete = (imageIndex) => {
    const deleted = images.filter((image, index) => index !== imageIndex);
    setImages(deleted);
    setCanSelect(true);
  };

  const handleSubmit = (next) => {
    const allDetails = { ...details };
    allDetails.pictures = images;
    allDetails.plan = { price, type, planId };
    allDetails.pricing = planId;
    setDetails(allDetails);
    if (!next || _id) {
      const { location } = allDetails;
      const refinedLocation = removeTypeName(location, "__typename");
      const newDetails = { ...allDetails };
      newDetails.location = refinedLocation;
      console.log("refined", refinedLocation);
      if (_id) {
        return updateCar({ ...newDetails, _id: _id });
      }
      createCar(allDetails);
    } else setStep(2);
  };

  if (error) {
    console.log("error", error);
  }

  if (data && !error) {
    return (
      <Redirect
        loggedIn
        to={{
          pathname: "/account",
          state: {
            payment: true,
          },
        }}
      />
    );
  }

  return (
    <>
      <ScrollTop />
      <div className="register__main__heading">
        <i class="fas fa-camera"></i> <h1 className="h1">Photos</h1>
      </div>

      <form action="" className="form form--new-ad form__pictures">
        <h2 className="h2 j-s-start">Pictures</h2>
        <div className="form__files m-t-2">
          <div
            id="drag-area"
            className={`form__files__drag-area ${
              isDragActive && "form__files__drag-area--active"
            }`}
            {...(canSelect && getRootProps())}
          >
            {images.length ? (
              images.map((image, index) =>
                image === "loading" ? (
                  <div className="form__files__drag-area__picture form__files__drag-area__picture--test">
                    <div className="form__files__drag-area__picture__spinner"></div>
                  </div>
                ) : (
                  <div
                    className="form__files__drag-area__picture"
                    style={{ backgroundImage: `url("${image}")` }}
                  >
                    <div className="form__files__drag-area__picture__menu">
                      <i
                        className="fa fa-trash"
                        onMouseOver={() => setCanSelect(false)}
                        onMouseLeave={() => setCanSelect(true)}
                        onClick={() => handleDelete(index)}
                      ></i>
                    </div>
                  </div>
                )
              )
            ) : (
              <div className="form__files__drag-area__text">
                <p>Drag & drop files here … </p>
                <p>(or click to select files)</p>
              </div>
            )}
          </div>
          <input {...getInputProps()} id="browse" />
        </div>
        <label for="browse">
          <div for="browse" className="form__browse" type="div">
            <i class="far fa-folder-open"></i> Browse
          </div>
        </label>

        <p className="m-t-1 j-s-center">
          Add up to 10 pictures. Use real pictures of your product, not
          catalogs.{" "}
        </p>
        <hr />
        <button
          className="form__next"
          type="button"
          onClick={() => {
            if (price > 0) handleSubmit(true);
            else handleSubmit();
          }}
          disabled={!images.length || images.includes("loading")}
        >
          {_id ? "Update" : price === 0 ? "Finish" : "Next"}
        </button>
      </form>
    </>
  );
};

export default Details;
