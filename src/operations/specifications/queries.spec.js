import gql from "graphql-tag";

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

const GET_CATEGORIES = gql`
  query user($input: FindByIdType!) {
    getUser(input: $input) {
      email
      phoneNumber
      hidePhoneNumber
    }
  }
`;

const USER_LOGIN = gql`
  query signUser($input: LoginInput!) {
    signIn(input: $input) {
      _id
      token
    }
  }
`;

const IMAGE_FILES = gql`
  query image($input: FindProfileImagetype!) {
    image(input: $input) {
      url
    }
  }
`;
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
        location {
          stateName
        }
      }
    }
  }
`;

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

const GET_NUMBERS = gql`
  query getNumbers($input: FindByIdType!) {
    getNumbers(input: $input) {
      transactions
      cars
    }
  }
`;

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

const GET_RECOMMENDED_ADS = gql`
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

const GET_SEARCH_RESULT = gql`
  query carSearchFilter($input: SearchType!) {
    carSearchFilter(input: $input) {
      cars {
        owner {
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

const GET_STATES = gql`
    query getStates {
      states {
        states {
          stateName
          count
        }
      }
    }
`
export {
  GET_USER,
  GET_CATEGORIES,
  USER_LOGIN,
  IMAGE_FILES,
  PRICINGS,
  CATEGORIES,
  GET_CARS,
  GET_CARS_BY_OWNER,
  GET_CAR_BY_ID,
  GET_CAR_BY_PERMALINK,
  GET_TRANSSACTION,
  GET_NUMBERS,
  GET_FEEDBACK,
  GET_RECOMMENDED_ADS,
  GET_SEARCH_RESULT,
  GET_STATES
};
