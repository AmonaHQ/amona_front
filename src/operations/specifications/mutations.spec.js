import gql from "graphql-tag";

const CREATE_USER = gql`
  mutation CreateUser($newUser: RegistrationInput!) {
    signUp(input: $newUser) {
      _id
      token
    }
  }
`;
const UPDATE_USER = gql`
  mutation user($input: UpdateUserInput!) {
    updateUser(input: $input) {
      _id
      token
      firstName
    }
  }
`;
const DELETE_IMAGE = gql`
  mutation deleteImage($input: FindProfileImagetype!) {
    deleteImage(input: $input) {
      status
      success
    }
  }
`;

const NEW_CAR = gql`
  mutation createCar($input: CarInputType!) {
    createCar(input: $input) {
      title
    }
  }
`;

const NEW_PAYMENT = gql`
  mutation createPayment($input: PaymentInputType!) {
    createPayment(input: $input) {
      _id
    }
  }
`;

const DELETE_CAR = gql`
  mutation deleteCar($input: FindByIdType!) {
    deleteCar(input: $input) {
      status
      success
      itemId
    }
  }
`;

const UPDATE_CAR = gql`
  mutation updateCar($input: CarUpdateType!) {
    updateCar(input: $input) {
      success
      status
    }
  }
`;

const CREATE_FEEDBACK = gql`
  mutation createFeedback($input: FeedbackInputType!) {
    createFeedback(input: $input) {
      _id
    }
  }
`;

const CREATE_STATE = gql`
  mutation createState($input: StateInputType!) {
    createState(input: $input) {
      stateName
    }
  }
`;

const UPDATE_STATE = gql`
  mutation updateState($input: UpdateStateType!) {
    updateState(input: $input) {
      stateName
    }
  }
`;

const DELETE_STATE = gql`
  mutation deleteState($input: FindByStateType!) {
    deleteState(input: $input) {
      success
    }
  }
`;

export {
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
};
