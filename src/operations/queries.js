import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { useAuthToken } from "../token";
const GET_CATEGORIES = gql`
  query user($input: FindByIdType!) {
    getUser(input: $input) {
      _id
      firstName
      lastName
      email
      phoneNumber
      hidePhoneNumber
    }
  }
`;

const useUserQuery = () => {
  const [, , , getId] = useAuthToken()
  console.log("userrrrrrrrr", getId("user"));
  return useQuery(GET_CATEGORIES, {
    variables: { input: { _id: getId("user") } },
  });
};

export { useUserQuery };
