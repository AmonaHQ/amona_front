import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-link";
import { useAuthToken } from "../token";

const link = new HttpLink({ uri: "http://localhost:5000/graphql" });

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
console.log("auth token", authToken)
  return new ApolloClient({
    link: authMiddleware(authToken).concat(link),
    cache,
  });
};
export default useAppApolloClient;
