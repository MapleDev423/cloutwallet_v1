const { RESTDataSource } = require("apollo-datasource-rest");

class TransactionAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.bitclout.com/api/v1";
  }

  async getTransactions(PublicKeyBase58Check) {
    const myHeaders = {
      "Content-Type": "application/json",
    };
    const data = await this.post(
      `/transaction-info`,
      {
        PublicKeyBase58Check: PublicKeyBase58Check,
        IsMempool: false,
      },
      {
        headers: myHeaders,
      }
    );
    console.log(data);
    return data;
  }
}

module.exports = TransactionAPI;
