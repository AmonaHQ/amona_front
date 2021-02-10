import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
// import { HttpLink } from "apollo-link-http";
import { createUploadLink } from "apollo-upload-client";
import { ApolloLink } from "apollo-link";
import { useAuthToken } from "../token";

const link = new createUploadLink({ uri: process.env.REACT_APP_baseUrl });

const authMiddleware = (authToken) =>
  new ApolloLink((operation, forward) => {
    if (authToken) {
      operation.setContext({
        headers: { authorization: `Bearer ${authToken}` },
      });
    }
    return forward(operation);
  });
const cache = new InMemoryCache({});

const useAppApolloClient = () => {
  const [authToken] = useAuthToken();
  console.log("auth token", authToken);
  return new ApolloClient({
    link: authMiddleware(authToken).concat(link),
    cache,
  });
};
export default useAppApolloClient;
