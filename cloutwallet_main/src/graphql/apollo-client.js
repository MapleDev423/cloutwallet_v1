import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://www.infinimind.io/graphql",
  cache: new InMemoryCache(),
});

export default client;
