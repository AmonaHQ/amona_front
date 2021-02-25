import gql from "graphql-tag";
import { useRecoilState } from "recoil";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { useAuthToken } from "../token";
import {
  loginState,
  userDetailsState,
  imageUploadType,
  detailsState,
  busyOverlayState,
} from "../recoil/atoms";

const useUserQuery = () => {
  const GET_USER = gql`
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
  return useQuery(GET_USER, {
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

const useCarQuery = () => {
  const GET_CARS = gql`
    query getCars {
      cars {
        cars {
          owner {
            firstName
            rating
          }
          category
          title
          make
          model
          price
          location {
            stateName
          }
          created_at
          hidePhoneNumber
          pictures
          pricing {
            type
            badge {
              backgroundColor
              color
            }
          }
          permalink
        }
      }
    }
  `;

  return useQuery(GET_CARS, {
    onCompleted: (data) => {},
  });
};

const useRecommendedAdQuery = () => {
  const GET_CARS = gql`
    query getCars($input: RecommendedInputType!) {
      recommendedAds(input: $input) {
        cars {
          owner {
            firstName
            rating
          }
          category
          title
          make
          model
          price
          location {
            stateName
          }
          created_at
          hidePhoneNumber
          pictures
          pricing {
            type
            badge {
              backgroundColor
              color
            }
          }
          permalink
        }
      }
    }
  `;

  const [getRecommended, getRecommendedResults] = useLazyQuery(GET_CARS, {
    onCompleted: (data) => {
      console.log("recommended ads", data);
    },
  });

  const getRecommendedAds = (data) => {
    getRecommended({
      variables: { input: data },
    });
  };

  return [getRecommendedAds, getRecommendedResults];
};

const useCarByOwnerQuery = () => {
  const [, , , getId] = useAuthToken();

  const GET_CARS_BY_OWNER = gql`
    query getCars($input: FindByIdType!) {
      carsByOwner(input: $input) {
        cars {
          _id
          title
          price
          pictures
          make
          pricing {
            _id
            currency
            currencySymbol
            type
          }
        }
      }
    }
  `;

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
  const GET_CAR_BY_ID = gql`
    query getCar($input: FindByIdType!) {
      findOneCar(input: $input) {
        _id
        category
        title
        description
        make
        model
        year
        condition
        mileage
        location {
          stateName
          formatted_address
          countryName
          lat
          lng
          place_id
        }
        price
        pictures
        transmission
        numberOfDoors
        fuelType
        drive
        interiorColor
        exteriorColor
        videoLink
        features
        phoneNumber
        negotiable
        email
        hidePhoneNumber
      }
    }
  `;

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
  const GET_CAR_BY_PERMALINK = gql`
    query getCar($input: FindByPermalinkType!) {
      findOneCarByPermalink(input: $input) {
        _id
        category
        title
        description
        make
        model
        year
        condition
        mileage
        location {
          stateName
          formatted_address
          countryName
          lat
          lng
          place_id
        }
        price
        pictures
        transmission
        numberOfDoors
        fuelType
        drive
        interiorColor
        exteriorColor
        videoLink
        features
        phoneNumber
        email
        hidePhoneNumber
        negotiable
        owner {
          _id
          firstName
          lastName
          rating
          votes
          created_at
        }
        created_at
      }
    }
  `;

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
  // setBusy(true);
  const GET_TRANSSACTION = gql`
    query getTransactions($input: FindByIdType!) {
      paymentsByUser(input: $input) {
        payments {
          type
          amount
          paymentMethod
          planId
          user
          paymentReference
          currency
          currencySymbol
          created_at
        }
      }
    }
  `;

  return useQuery(GET_TRANSSACTION, {
    variables: { input: { _id: getId("user") } },
    onCompleted: (data) => {
      setBusy(false);
    },
  });
};

const useGetNumbers = () => {
  const [, , , getId] = useAuthToken();
  const GET_NUMBERS = gql`
    query getNumbers($input: FindByIdType!) {
      getNumbers(input: $input) {
        transactions
        cars
      }
    }
  `;
  return useQuery(GET_NUMBERS, {
    variables: { input: { _id: getId("user") } },
    onCompleted: (data) => {
      console.log("numbers", data);
    },
  });
};

const useGetFeedbacksByPost = () => {
  const GET_FEEDBACK = gql`
    query getFeedback($input: FeedbacksByPostType!) {
      feedbackByPost(input: $input) {
        feedbacks {
          feedback
          rating
          user {
            firstName
            profileImage {
              url
            }
          }
          created_at
        }
      }
    }
  `;

  const [getFeedbacks, getFeedbacksResult] = useLazyQuery(GET_FEEDBACK, {
    errorPolicy: "ignore",
   
    onCompleted: (data) => {},
  });

  const getFeedbacksByPost = (postId) => {
    getFeedbacks({
      variables: { input: { postId } },
    });
  };

  return [getFeedbacksByPost, getFeedbacksResult];
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
};
