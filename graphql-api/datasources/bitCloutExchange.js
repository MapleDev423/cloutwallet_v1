const { RESTDataSource } = require("apollo-datasource-rest");

class BitCloutExchangeAPI extends RESTDataSource {
  constructor() {
    super();
  }

  async getBitCloutExchange() {
    const myHeaders = {
      "Content-Type": "application/json",
    };
    const exchange = await this.get(
      `https://api.bitclout.com/get-exchange-rate`,
      {
        headers: myHeaders,
      }
    );
    const ticker = await this.get(`https://blockchain.info/ticker`, {
      headers: myHeaders,
    });

    const data =
      ((ticker.USD.last / 100) * exchange.SatoshisPerBitCloutExchangeRate) /
      1000000;
    const response = {
      USDRate: data,
    };
    return response;
  }
}

module.exports = BitCloutExchangeAPI;
