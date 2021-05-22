const { ApolloServer, ApolloError } = require("apollo-server");
const ProfileAPI = require("./datasources/profile");
const HoldingAPI = require("./datasources/holding");
const TransactionAPI = require("./datasources/transactions");
const BitCloutExchangeAPI = require("./datasources/bitCloutExchange");
const typeDefs = require("./schema");

const resolvers = require("./resolvers");

const dataSources = () => ({
  profileAPI: new ProfileAPI(),
  holdingAPI: new HoldingAPI(),
  transactionsAPI: new TransactionAPI(),
  bitCloutExchangeAPI: new BitCloutExchangeAPI(),
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  debug: false,
  formatError: (err) => {
    if (err.extensions.code == "INTERNAL_SERVER_ERROR") {
      return new ApolloError("Couldn't reach the server", "ERROR");
    }
    return err;
  },
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
