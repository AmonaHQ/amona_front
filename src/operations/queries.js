import { useRecoilState } from "recoil";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { useAuthToken } from "../token";
import {
  loginState,
  userDetailsState,
  imageUploadType,
  detailsState,
  busyOverlayState,
  spinLoaderState,
} from "../recoil/atoms";

import {
  GET_USER,
  GET_CATEGORIES,
  USER_LOGIN,
  IMAGE_FILES,
  CATEGORIES,
  GET_CARS,
  GET_CARS_BY_OWNER,
  GET_CAR_BY_ID,
  GET_CAR_BY_PERMALINK,
  GET_TRANSSACTION,
  GET_NUMBERS,
  GET_FEEDBACK,
  PRICINGS,
  GET_RECOMMENDED_ADS,
  GET_SEARCH_RESULT,
  GET_STATES,
} from "./specifications/queries.spec";

const useUserQuery = () => {
  const [, , , getId] = useAuthToken();
  return useQuery(GET_USER, {
    variables: { input: { _id: getId("user") } },
  });
};

const useSellerDetailsQuery = () => {
  const [details, setDetails] = useRecoilState(detailsState);

  const [, , , getId] = useAuthToken();
  return useQuery(GET_CATEGORIES, {
    variables: { input: { _id: getId("user") } },
    onCompleted: (data) => {
      const user = data.getUser;
      const allDetails = { ...details };
      if (!allDetails.phoneNumber) {
        allDetails.phoneNumber = user.phoneNumber;
        allDetails.email = user.email;
        allDetails.hidePhoneNumber = user.hidePhoneNumber;
        setDetails(allDetails);
        console.log("seller data", user);
      }
    },
  });
};

const useLoginQuery = () => {
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
  return useQuery(PRICINGS);
};

const useCategoriesQuery = () => {
  return useQuery(CATEGORIES, {
    onCompleted: (data) => {},
  });
};

const useCarQuery = () => {
  return useQuery(GET_CARS, {
    onCompleted: (data) => {},
  });
};

const useRecommendedAdQuery = () => {
  const [getRecommended, getRecommendedResults] = useLazyQuery(
    GET_RECOMMENDED_ADS,
    {
      onCompleted: (data) => {
        console.log("recommended ads", data);
      },
    }
  );

  const getRecommendedAds = (data) => {
    getRecommended({
      variables: { input: data },
    });
  };

  return [getRecommendedAds, getRecommendedResults];
};

const useCarByOwnerQuery = () => {
  const [, , , getId] = useAuthToken();

  return useQuery(GET_CARS_BY_OWNER, {
    variables: { input: { _id: getId("user") } },
    onCompleted: (data) => {
      console.log("cars by owner", data);
    },
    refetchQueries: [
      {
        query: GET_CARS_BY_OWNER,
        variables: {
          input: { _id: getId("user") },
        },
      },
    ],
  });
};

const useGetCarById = () => {
  const [details, setDetails] = useRecoilState(detailsState);

  const [getCar, getCarResult] = useLazyQuery(GET_CAR_BY_ID, {
    onCompleted: (data) => {
      setDetails({ ...details, ...data.findOneCar });
      console.log("car by id", data);
    },
  });

  const getCarById = (data) => {
    getCar({
      variables: { input: data },
    });
  };
  return [getCarById, getCarResult];
};

const useGetCarByPermalink = (permalink) => {
  const [details, setDetails] = useRecoilState(detailsState);

  return useQuery(GET_CAR_BY_PERMALINK, {
    variables: { input: { permalink } },
    onCompleted: (data) => {
      console.log("permalink", data);
    },
  });
};

const useTransactionQuery = () => {
  const [, , , getId] = useAuthToken();
  const [, setBusy] = useRecoilState(busyOverlayState);

  return useQuery(GET_TRANSSACTION, {
    variables: { input: { _id: getId("user") } },
    onCompleted: (data) => {
      setBusy(false);
    },
  });
};

const useGetNumbers = () => {
  const [, , , getId] = useAuthToken();

  return useQuery(GET_NUMBERS, {
    variables: { input: { _id: getId("user") } },
    onCompleted: (data) => {
      console.log("numbers", data);
    },
  });
};

const useGetFeedbacksByPost = () => {
  const [getFeedbacks, getFeedbacksResult] = useLazyQuery(GET_FEEDBACK, {
    errorPolicy: "all",
  });

  const getFeedbacksByPost = (postId) => {
    getFeedbacks({
      variables: { input: { postId } },
    });
  };

  return [getFeedbacksByPost, getFeedbacksResult];
};

const useGetSearchResult = () => {
  const [, setBusy] = useRecoilState(spinLoaderState);
  const [getSearchResults, searchResults] = useLazyQuery(GET_SEARCH_RESULT, {
    onCompleted: (data) => {
      setBusy(false);
    },
  });

  if (searchResults.error) {
    setBusy(false);
  }

  const getResults = (data = {}) => {
    setBusy(true);
    getSearchResults({
      variables: { input: data },
    });
  };

  return [getResults, searchResults];
};

const useStatesQuery = () => {
  return useQuery(GET_STATES, {
    errorPolicy: "all",
    onCompleted: (data) => {
      console.log("states", data);
    },
  });
};
export {
  useUserQuery,
  useLoginQuery,
  useImageQuery,
  usePricingsQuery,
  useCategoriesQuery,
  useSellerDetailsQuery,
  useCarQuery,
  useCarByOwnerQuery,
  useGetCarById,
  useTransactionQuery,
  useGetNumbers,
  useGetCarByPermalink,
  useRecommendedAdQuery,
  useGetFeedbacksByPost,
  useGetSearchResult,
  useStatesQuery,
};
