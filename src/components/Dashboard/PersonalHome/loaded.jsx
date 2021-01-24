import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useAlert } from "react-alert";
import { useRecoilState, useRecoilValue } from "recoil";
import defaultProfileImage from "../../../assets/img/icons/user.jpg";
import {
  useUpdateUserMutation,
  useFileMutation,
  useDeleteImageMutation,
} from "../../../operations/mutaions";
import { useImageQuery } from "../../../operations/queries";
import Validator from "../../Commons/validator";
import { storage } from "../../../firebase/firebase";
import { useAuthToken } from "../../../token";
import {
  imageUploadState,
  showWarningState,
  deleteProfileImageState,
} from "../../../recoil/atoms";
import { currentImageUploadType } from "../../../recoil/selectors";
import Warning from "../../Commons/warning";
import "sweetalert2/src/sweetalert2.scss";
import Axios from "axios";

const Loaded = ({ data }) => {
  const [, setModalShow] = useRecoilState(showWarningState);
  const [deleteState, setDeleteState] = useRecoilState(deleteProfileImageState);
  const uploadType = useRecoilValue(currentImageUploadType);
  const [canSelect, setCanSelect] = useState(true);
  const [progress, setProgress] = useState("0%");
  const [uploading, setUploading] = useRecoilState(imageUploadState);
  const [progressText, setProgressText] = useState("Click or drag file");
  const [, , , getId] = useAuthToken();
  const [uploadFile, uploadFileResult] = useFileMutation();
  const [deleteFile, deleteFileResult] = useDeleteImageMutation();

  const profileImage = useImageQuery();

  const onDrop = useCallback((acceptedFiles) => {
    setProgressText("Uploading...");
    setProgress("0%");
    setUploading(true);
    setDeleteState(false);
    const file = acceptedFiles[0];
    const uploadTask = storage.ref(`/images/${file.name}`).put(file);
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        const progress =
          Math.round(snapShot.bytesTransferred / snapShot.totalBytes) * 100;
        setProgress(`${progress}%`);
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
            uploadFile({
              fileName: file.name,
              url: fireBaseUrl,
            });

            setProgressText("Saving...");
          });
      }
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  const [inputData, setInputData] = useState({});

  const [
    updateUser,
    { error, loading, data: updateData },
  ] = useUpdateUserMutation();

  const [errorMessages, setErrorMessages] = useState({});
  const [disabledButton, setDisableButton] = useState(false);

  if (error) {
    console.log("user error", error);
  }

  const handleChange = (event) => {
    const allData = { ...inputData };
    allData[event.target.name] =
      event.target.name === "hidePhoneNumber"
        ? event.target.checked
        : event.target.value;
    setInputData(allData);
  };

  const handleSubmit = () => {
    updateUser(inputData);
    setDisableButton(true);
  };
  const handleDelete = () => {
    deleteFile();
  };
  useEffect(() => {
    const getData = async () => {
      const data = await Axios.post(
        "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVINValuesBatch/",
        {DATA:"WVWJK73C49P057268"}
      );
      console.log("data", data);
    };
    getData();
    setInputData(data);
  }, []);

  return (
    <>
      <Warning callback={handleDelete} />
      <div className="dashboard__main__quick-stat card">
        <figure className="dashboard__main__quick-stat__avatar">
          <i
            style={{
              backgroundImage:
                !deleteState &&
                `url(${
                  uploadFileResult.data && uploadFileResult.data[uploadType]
                    ? uploadFileResult.data[uploadType].url
                    : profileImage.data && profileImage.data.image.url
                })`,
            }}
            className={
              (uploadFileResult.data || profileImage.data) && !deleteState
                ? "dashboard__main__profile__photo__body__img__background"
                : "fa fa-user"
            }
          ></i>

          <h2>{data.firstName}</h2>
        </figure>

        <div className="dashboard__main__quick-stat__values">
          <div className="dashboard__main__quick-stat__values__group">
            <i class="far fa-envelope"></i>
            <div>
              <span>0</span>
              <span>mail</span>
            </div>
          </div>
          <div className="dashboard__main__quick-stat__values__group">
            <i class="far fa-eye"></i>
            <div>
              <span>0</span>
              <span>visit</span>
            </div>
          </div>
          <div className="dashboard__main__quick-stat__values__group">
            <i class="fas fa-th-large"></i>
            <div>
              <span>0</span>
              <span>ad</span>
            </div>
          </div>
          <div className="dashboard__main__quick-stat__values__group">
            <i class="far fa-user"></i>
            <div>
              <div>
                <span>0</span>
                <span>favorite</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard__main__profile card">
        <div className="dashboard__main__profile__heading">
          <h2 className="">{`Hello ${data.firstName} !`} </h2>
          <p>You last logged in at: 05 January 2021 06:54 </p>
        </div>
        <div className="dashboard__main__profile__photo card">
          <div className="dashboard__main__profile__photo__header">
            Photo or Avatar
          </div>
          <div className="dashboard__main__profile__photo__body">
            <figure
              style={{
                pointerEvents:
                  (uploadFileResult.loading || uploading) &&
                  !uploadFileResult.data &&
                  "none",
              }}
              className={`dashboard__main__profile__photo__body__img card `}
              {...(canSelect && getRootProps())}
            >
              <div className={`${isDragActive && "active"} `}>
                <input {...getInputProps()} />
                {(uploadFileResult.loading || uploading) && (
                  <p className="uploading">
                    <span>{progress}</span>
                  </p>
                )}
                {((uploadFileResult.data &&
                  uploadFileResult.data[uploadType]) ||
                  profileImage.data) &&
                !deleteState ? (
                  <div
                    className="dashboard__main__profile__photo__body__img__background"
                    style={{
                      display:
                        uploadFileResult.loading || uploading
                          ? "none"
                          : "initial",
                      backgroundImage: `url(${
                        uploadFileResult.data
                          ? uploadFileResult.data[uploadType].url
                          : profileImage.data && profileImage.data.image.url
                      })`,
                    }}
                  >
                    <div className="dashboard__main__profile__photo__body__img__background__menu">
                      <i className="fa fa-pencil"></i>
                      <i
                        className={`${deleteFileResult.loading && "deleting"}`}
                        onMouseOver={() => setCanSelect(false)}
                        onMouseLeave={() => setCanSelect(true)}
                        className="fa fa-trash"
                        onClick={() => setModalShow(true)}
                      ></i>
                    </div>
                  </div>
                ) : (
                  <img
                    style={{
                      display:
                        (uploadFileResult.loading || uploading) && "none",
                    }}
                    src={defaultProfileImage}
                    alt="Profile"
                  />
                )}

                {(uploadFileResult.loading || uploading) && (
                  <span>{progressText}</span>
                )}
              </div>
            </figure>
          </div>
        </div>

        <div className="dashboard__main__profile__photo card">
          <div className="dashboard__main__profile__photo__header">
            Account Details
          </div>
          <div className="dashboard__main__profile__account__body">
            {error && !loading && (
              <p className="overlay__content__body__error-message animated shake">
                {error && error.graphQLErrors && error.graphQLErrors[0].message}
              </p>
            )}
            <Validator
              setValidationMessage={(errorMessages) =>
                setErrorMessages(errorMessages)
              }
              toggleButtonDisable={(value) => setDisableButton(value)}
            >
              <form action="" className="form form--account">
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
                    />
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
                    />
                    <p className="formGroup__alert">
                      {errorMessages.lastNameError}
                    </p>
                  </div>
                </div>
                <div className="formGroup">
                  <label htmlFor="" className="formGroup__label">
                    Username
                  </label>
                  <div className="formGroup__inputs__single">
                    <input
                      title="Once username is added, it cannot be changed"
                      disabled={data.username}
                      type="text"
                      className="formGroup__input"
                      placeholder="Username"
                      name="username"
                      schema={JSON.stringify({
                        minLength: 3,
                        maxLength: 15,
                        maxWords: 1,
                        label: "Username",
                      })}
                      value={inputData.username}
                      onChange={handleChange}
                    />{" "}
                    <p className="formGroup__alert">
                      {errorMessages.usernameError}
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
                      value={inputData.email}
                      disabled={true}
                    />
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
                        checked={inputData.hidePhoneNumber}
                        schema={JSON.stringify({
                          required: false,
                          label: "Phone option",
                        })}
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
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={disabledButton}
                  className={`form__browse ${
                    loading && "form__browse--loading"
                  }`}
                >
                  <span>Update</span>
                </button>
              </form>
            </Validator>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loaded;
