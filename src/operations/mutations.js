import React from "react";
import gql from "graphql-tag";
import { useAlert } from "react-alert";
import { useRecoilState, useRecoilValue } from "recoil";
import { useMutation } from "@apollo/react-hooks";
import { useAuthToken } from "../token";
import {
  loginState,
  userDetailsState,
  imageUploadState,
  deleteProfileImageState,
  busyOverlayState,
  detailsState,
  adDetailsProgressState,
  updateIdState,
} from "../recoil/atoms";
import { currentImageUploadType } from "../recoil/selectors";
import removeTypeName from "../utilities/remove-typename";
import {
  CREATE_USER,
  UPDATE_USER,
  DELETE_IMAGE,
  NEW_CAR,
  NEW_PAYMENT,
  DELETE_CAR,
  UPDATE_CAR,
  CREATE_FEEDBACK,
  CREATE_STATE,
  UPDATE_STATE,
  DELETE_STATE,
} from "./specifications/mutations.spec";
import {
  GET_CARS_BY_OWNER,
  GET_NUMBERS,
  GET_FEEDBACK,
  GET_CAR_BY_ID,
  GET_CARS,
} from "./specifications/queries.spec";

const useRegistrationMutation = () => {
  const [, setIsLoggedIn] = useRecoilState(loginState);
  const [, setAuthToken] = useAuthToken();
  const [createUser, createUserResult] = useMutation(CREATE_USER, {
    errorPolicy: "all",
    onCompleted: (data) => {
      console.log("signed up", data);
      if (data.signUp) {
        setIsLoggedIn(true);
        setAuthToken("authToken", data.signUp.token);
        setAuthToken("user", data.signUp._id);
        localStorage.setItem("authToken", data.signUp.firstName);
      }
    },
  });

  const register = (data) => {
    createUser({
      variables: { newUser: data },
    });
  };

  return [register, createUserResult];
};

const useUpdateUserMutation = () => {
  const [, setAuthToken, , getId] = useAuthToken();
  const [, setUser] = useRecoilState(userDetailsState);
  const alert = useAlert();

  const [updateUser, updateUserResult] = useMutation(UPDATE_USER, {
    errorPolicy: "all",
    onCompleted: (data) => {
      if (data.updateUser) {
        setUser({ firstName: data.updateUser.firstName });
        setAuthToken("authToken", data.updateUser.token);
        alert.success(
          <div
            className="alerts"
            style={{
              color: "white",
              textTransform: "capitalize",
              fontSize: "1.5rem",
            }}
          >
            <span className="float-left">Profile updated successfully</span>
          </div>
        );
      }
    },
  });

  const updateUserInformation = (data) => {
    delete data.email;
    const refinedUser = removeTypeName(data, "__typename");

    updateUser({
      variables: { input: { _id: getId("user"), ...refinedUser } },
      optimisticResponse: {
        __typename: "Mutation",
        updateUser: {
          firstName: "commentId",
        },
      },
    });
  };

  return [updateUserInformation, updateUserResult];
};

const useFileMutation = () => {
  const [, setUploading] = useRecoilState(imageUploadState);
  const [, , , getId] = useAuthToken();
  const type = useRecoilValue(currentImageUploadType);
  const query = {
    uploadImage: gql`
      mutation uploadImage($input: ProfileImageInputType!) {
        uploadImage(input: $input) {
          url
          fileName
        }
      }
    `,
    updateImage: gql`
      mutation updateImage($input: ProfileImageInputType!) {
        updateImage(input: $input) {
          url
          fileName
        }
      }
    `,
  };

  const [uploadFile, uploadFileResult] = useMutation(query[type], {
    errorPolicy: "all",
    onCompleted: (data) => {
      setUploading(false);
    },
  });

  const upload = (data) => {
    uploadFile({ variables: { input: { user: getId("user"), ...data } } });
  };
  return [upload, uploadFileResult];
};

const useDeleteImageMutation = () => {
  const [, , , getId] = useAuthToken();
  const [, setDeleteState] = useRecoilState(deleteProfileImageState);
  const alert = useAlert();

  const [deleteImage, deleteImageResult] = useMutation(DELETE_IMAGE, {
    errorPolicy: "all",
    onCompleted: (data) => {
      setDeleteState(true);
      alert.success(
        <div
          className="alerts"
          style={{
            color: "white",
            textTransform: "capitalize",
            fontSize: "1.5rem",
          }}
        >
          <span className="float-left">Profile image deleted successfully</span>
        </div>
      );
    },
  });

  const deleteProfileImage = () => {
    deleteImage({
      variables: { input: { user: getId("user") } },
    });
  };

  return [deleteProfileImage, deleteImageResult];
};

const useCreateCarMutation = () => {
  const [, , , getId] = useAuthToken();
  const [, setIsBusy] = useRecoilState(busyOverlayState);
  const [, setDetails] = useRecoilState(detailsState);
  const [, setProgress] = useRecoilState(adDetailsProgressState);
  const alert = useAlert();

  const [createCar, createCarResult] = useMutation(NEW_CAR, {
    errorPolicy: "all",
    onCompleted: (data) => {
      if (data.createCar) {
        setIsBusy(false);
        setDetails({});
        setProgress(0);
        alert.success(
          <div
            className="alerts"
            style={{
              color: "white",
              textTransform: "capitalize",
              fontSize: "1.5rem",
            }}
          >
            <span className="float-left">Ad published successfully</span>
          </div>
        );
      }
    },
    refetchQueries: [
      {
        query: GET_CARS_BY_OWNER,
        variables: {
          input: { _id: getId("user") },
        },
      },
      {
        query: GET_NUMBERS,
        variables: {
          input: { _id: getId("user") },
        },
      },
    ],
  });

  const createNewCar = (data) => {
    setIsBusy(true);

    createCar({
      variables: {
        input: { ...data, owner: getId("user"), status: "published" },
      },
    });
  };

  return [createNewCar, createCarResult];
};

const useCreatePaymentMutation = () => {
  const [, setIsBusy] = useRecoilState(busyOverlayState);
  const [, , , getId] = useAuthToken();

  const [createPayment, createPaymentResult] = useMutation(NEW_PAYMENT, {
    errorPolicy: "all",
    onCompleted: (data) => {
      console.log("payment completed", data);
      setIsBusy(false);
    },
  });

  const createNewPayment = (data) => {
    createPayment({
      variables: { input: { ...data, user: getId("user") } },
    });
  };

  return [createNewPayment, createPaymentResult];
};

const useDeleteCarMutation = () => {
  const [, , , getId] = useAuthToken();
  const [, setIsBusy] = useRecoilState(busyOverlayState);
  const alert = useAlert();

  const [deleteCar, deleteCarResult] = useMutation(DELETE_CAR, {
    errorPolicy: "all",
    onCompleted: (data) => {
      setIsBusy(false);
      alert.success(
        <div
          className="alerts"
          style={{
            color: "white",
            textTransform: "capitalize",
            fontSize: "1.5rem",
          }}
        >
          <span className="float-left">Ad deleted successfully</span>
        </div>
      );
    },
    update: (cache, { data }) => {
      const existingCars = cache.readQuery({
        query: GET_CARS_BY_OWNER,
        variables: {
          input: { _id: getId("user") },
        },
      });

      const { cars } = existingCars.carsByOwner;

      const newCars = cars.filter((car) => car._id !== data.deleteCar.itemId);
      cache.writeQuery({
        query: GET_CARS_BY_OWNER,
        variables: {
          input: { _id: getId("user") },
        },
        data: { carsByOwner: { cars: newCars } },
      });
    },
    refetchQueries: [
      {
        query: GET_NUMBERS,
        variables: {
          input: { _id: getId("user") },
        },
      },
    ],
  });

  const deleteAd = (data) => {
    setIsBusy(true);
    deleteCar({
      variables: { input: data },
    });
  };

  return [deleteAd, deleteCarResult];
};

const useDeleteAllCarMutation = () => {
  const [, , , getId] = useAuthToken();
  const [, setIsBusy] = useRecoilState(busyOverlayState);
  const alert = useAlert();

  const [deleteCar, deleteCarResult] = useMutation(DELETE_CAR, {
    errorPolicy: "all",
    onCompleted: (data) => {
      setIsBusy(false);
      alert.success(
        <div
          className="alerts"
          style={{
            color: "white",
            textTransform: "capitalize",
            fontSize: "1.5rem",
          }}
        >
          <span className="float-left">Ads deleted successfully</span>
        </div>
      );
    },
    refetchQueries: [
      {
        query: GET_CARS_BY_OWNER,
        variables: {
          input: { _id: getId("user") },
        },
      },
      {
        query: GET_NUMBERS,
        variables: {
          input: { _id: getId("user") },
        },
      },
    ],
  });

  const deleteAllAds = (data) => {
    setIsBusy(true);
    deleteCar({
      variables: { input: { ...data, owner: getId("user") } },
    });
  };

  return [deleteAllAds, deleteCarResult];
};

const useUpdateCarMutation = () => {
  const [, setIsBusy] = useRecoilState(busyOverlayState);
  const [carId] = useRecoilState(updateIdState);
  const [, , , getId] = useAuthToken();
  const alert = useAlert();

  const [updateCar, updateCarResult] = useMutation(UPDATE_CAR, {
    onCompleted: (data) => {
      setIsBusy(false);
      alert.success(
        <div
          className="alerts"
          style={{
            color: "white",
            textTransform: "capitalize",
            fontSize: "1.5rem",
          }}
        >
          <span className="float-left">Ad updated successfully</span>
        </div>
      );
    },

    refetchQueries: [
      {
        query: GET_CARS_BY_OWNER,
        variables: {
          input: { _id: getId("user") },
        },
      },
      {
        query: GET_CARS,
      },
      {
        query: GET_CAR_BY_ID,
        onCompleted: (data) => {
          console.log("refetched", data);
        },
        variables: {
          input: { _id: carId },
        },
      },
    ],
  });

  const updateACar = (data) => {
    setIsBusy(true);
    const refinedCar = removeTypeName(data, "__typename");

    updateCar({
      variables: { input: refinedCar },
    });
  };

  return [updateACar, updateCarResult];
};

const useCreateFeedbackMutation = (postId) => {
  const [, , , getId] = useAuthToken();
  const alert = useAlert();

  const [createFeedback, createFeedbackResult] = useMutation(CREATE_FEEDBACK, {
    errorPolicy: "all",

    onCompleted: (data) => {
      if (data && data.createFeedback) {
        alert.success(
          <div
            className="alerts"
            style={{
              color: "white",
              textTransform: "capitalize",
              fontSize: "1.5rem",
            }}
          >
            <span className="float-left">Your review has been published!</span>
          </div>
        );
      }
    },
    refetchQueries: [
      {
        query: GET_FEEDBACK,
        errorPolicy: "ignore",
        variables: {
          input: { postId },
        },
      },
    ],
  });

  const createNewFeedback = (data) => {
    createFeedback({
      variables: { input: { ...data, user: getId("user") } },
    });
  };
  return [createNewFeedback, createFeedbackResult];
};

const useCreateStateMutation = () => {
  const [createState, createStateResult] = useMutation(CREATE_STATE, {
    errorPolicy: "all",
    onCompleted: (data) => {
      console.log("state created", data);
    },
  });

  const createNewState = (data) => {
    createState({
      variables: { input: data },
    });
  };

  return [createNewState, createStateResult];
};

const useUpdateStateMutation = () => {
  const [updateState, updateStateResult] = useMutation(UPDATE_STATE, {
    errorPolicy: "all",
    onCompleted: (data) => {
      console.log("state UPDATED", data);
    },
  });

  const updateOldState = (data) => {
    console.log("data", data);
    updateState({
      variables: { input: data },
    });
  };

  return [updateOldState, updateStateResult];
};

const useDeleteStateMutation = () => {
  const [deleteState, deleteStateResult] = useMutation(DELETE_STATE, {
    errorPolicy: "all",
  });

  const deleteAState = (data) => {
    console.log("delete data", data);
    deleteState({
      variables: { input: data },
    });
  };

  return [deleteAState, deleteStateResult];
};
export {
  useRegistrationMutation,
  useUpdateUserMutation,
  useFileMutation,
  useDeleteImageMutation,
  useCreateCarMutation,
  useCreatePaymentMutation,
  useDeleteCarMutation,
  useDeleteAllCarMutation,
  useUpdateCarMutation,
  useCreateFeedbackMutation,
  useCreateStateMutation,
  useUpdateStateMutation,
  useDeleteStateMutation,
};
