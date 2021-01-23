import gql from "graphql-tag";
import { useRecoilState } from "recoil";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { useAuthToken } from "../token";
import { loginState, userDetailsState, imageUploadType } from "../recoil/atoms";

const useUserQuery = () => {
  const GET_CATEGORIES = gql`
    query user($input: FindByIdType!) {
      getUser(input: $input) {
        _id
        firstName
        lastName
        email
        phoneNumber
        hidePhoneNumber
        username
      }
    }
  `;
  const [, , , getId] = useAuthToken();
  return useQuery(GET_CATEGORIES, {
    variables: { input: { _id: getId("user") } },
  });
};

const useLoginQuery = () => {
  const USER_LOGIN = gql`
    query signUser($input: LoginInput!) {
      signIn(input: $input) {
        _id
        token
      }
    }
  `;
  const [, setIsLoggedIn] = useRecoilState(loginState);
  const [, setInputData] = useRecoilState(userDetailsState);
  const [, setAuthToken] = useAuthToken();
  const [login, loginResult] = useLazyQuery(USER_LOGIN);

  const loginUser = ({ email, password }) => {
    login({
      variables: { input: { email, password } },
    });
  };
  if (loginResult.data && loginResult.data.signIn) {
    setAuthToken("authToken", loginResult.data.signIn.token);
    setAuthToken("user", loginResult.data.signIn._id);
    setIsLoggedIn(true);
    setInputData(loginResult.data.signIn);
  }
  return [loginUser, loginResult];
};

const useImageQuery = () => {
  const [, , , getId] = useAuthToken();
  const [_, setUploadType] = useRecoilState(imageUploadType);
  const IMAGE_FILES = gql`
    query image($input: FindProfileImagetype!) {
      image(input: $input) {
        url
      }
    }
  `;

  return useQuery(IMAGE_FILES, {
    onCompleted: (data) => {
      if (data && data.image) {
        setUploadType("updateImage");
      }
    },
    variables: { input: { user: getId("user") } },
  });
};

export { useUserQuery, useLoginQuery, useImageQuery };
