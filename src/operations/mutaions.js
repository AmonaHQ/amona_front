import gql from "graphql-tag";
import { useRecoilState } from "recoil";
import { useMutation } from "@apollo/react-hooks";
import { useAuthToken } from "../token";
import { loginState } from "../recoil/atoms";

const CREATE_USER = gql`
  mutation CreateUser($newUser: RegistrationInput!) {
    signUp(input: $newUser) {
      _id
      token
    }
  }
`;

const useRegistrationMutation = () => {
  const [, setIsLoggedIn] = useRecoilState(loginState);
  const [, setAuthToken] = useAuthToken();
  const [createUser, createUserResult] = useMutation(CREATE_USER, {
    errorPolicy: "all",
    onCompleted: (data) => {
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

export { useRegistrationMutation };
