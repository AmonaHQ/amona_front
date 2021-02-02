import gql from "graphql-tag";
import { useRecoilState } from "recoil";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { useAuthToken } from "../token";
import {
  loginState,
  userDetailsState,
  imageUploadType,
  detailsState,
} from "../recoil/atoms";

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

const useSellerDetailsQuery = () => {
  const [details, setDetails] = useRecoilState(detailsState);
  const GET_CATEGORIES = gql`
    query user($input: FindByIdType!) {
      getUser(input: $input) {
        email
        phoneNumber
        hidePhoneNumber
      }
    }
  `;
  const [, , , getId] = useAuthToken();
  return useQuery(GET_CATEGORIES, {
    variables: { input: { _id: getId("user") } },
    onCompleted: (data) => {
      const user = data.getUser;
      const allDetails = { ...details };
      allDetails.phoneNumber = user.phoneNumber;
      allDetails.email = user.email;
      allDetails.hidePhoneNumber = user.hidePhoneNumber;
      setDetails(allDetails)
      console.log("seller data", user);
    },
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
  const [, setUploadType] = useRecoilState(imageUploadType);
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

const usePricingsQuery = () => {
  const PRICINGS = gql`
    query pricings {
      pricings {
        success
        status
        pricings {
          _id
          type
          currency
          currencySymbol
          price
          features
          highlights {
            header
            button
            headerColor
            buttonColor
          }
        }
      }
    }
  `;

  return useQuery(PRICINGS);
};

const useCategoriesQuery = () => {
  const CATEGORIES = gql`
    query categories {
      categories {
        success
        categories {
          _id
          title
          thumbnail
        }
      }
    }
  `;

  return useQuery(CATEGORIES, {
    onCompleted: (data) => {},
  });
};
export {
  useUserQuery,
  useLoginQuery,
  useImageQuery,
  usePricingsQuery,
  useCategoriesQuery,
  useSellerDetailsQuery,
};
