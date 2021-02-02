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
  deleteProfileImageState,busyOverlayState
} from "../recoil/atoms";
import { currentImageUploadType } from "../recoil/selectors";

const useRegistrationMutation = () => {
  const CREATE_USER = gql`
    mutation CreateUser($newUser: RegistrationInput!) {
      signUp(input: $newUser) {
        _id
        token
      }
    }
  `;

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

  const UPDATE_USER = gql`
    mutation user($input: UpdateUserInput!) {
      updateUser(input: $input) {
        _id
        token
        firstName
      }
    }
  `;
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
    const refinedUser = {};
    for (const field in data) {
      if (field !== "__typename") {
        refinedUser[field] = data[field];
      }
    }
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
  const DELETE_IMAGE = gql`
    mutation deleteImage($input: FindProfileImagetype!) {
      deleteImage(input: $input) {
        status
        success
      }
    }
  `;
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
  const NEW_CAR = gql`
    mutation createCar($input: CarInputType!) {
      createCar(input: $input) {
        owner
      }
    }
  `;

  const [createCar, createCarResult] = useMutation(NEW_CAR, {
    errorPolicy: "all",
    onCompleted: (data) => {
      if (data.createCar) {
       setIsBusy(false)
      }
    },
  });

  const createNewCar = (data) => {
    setIsBusy(true)
    
    createCar({
      variables: { input: {...data, owner: getId("user"), status:"published"} },
    });
  };

  return [createNewCar, createCarResult];
};
export {
  useRegistrationMutation,
  useUpdateUserMutation,
  useFileMutation,
  useDeleteImageMutation,
  useCreateCarMutation,
};
