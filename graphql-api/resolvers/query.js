const { ApolloError } = require("apollo-server");

module.exports = {
  profile: (parent, { username }, { dataSources }, info) => {
    try {
      return dataSources.profileAPI.getProfile(username);
    } catch (error) {
      return new ApolloError("Unable to fetch profile");
    }
  },
  holding: (parent, { PublicKeyBase58Check }, { dataSources }, info) => {
    try {
      return dataSources.holdingAPI.getHolding(PublicKeyBase58Check);
    } catch (error) {
      return new ApolloError("Unable to fetch holdings");
    }
  },
  transactions: (parent, { PublicKeyBase58Check }, { dataSources }, info) => {
    try {
      return dataSources.transactionsAPI.getTransactions(PublicKeyBase58Check);
    } catch (error) {
      return new ApolloError("Unable to fetch transactioins");
    }
  },
  async bitCloutExchange(parent, args, { dataSources }, info) {
    try {
      const data = await dataSources.bitCloutExchangeAPI.getBitCloutExchange();
      return data;
    } catch (error) {
      return new ApolloError("Unable to fetch BitClout Exchange");
    }
  },
};
