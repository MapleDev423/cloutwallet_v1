const { RESTDataSource } = require("apollo-datasource-rest");
const nanosToBitClout = require("../helpers/nanosToBitClout");
const bitCloutUSD = require("../helpers/bitCloutUSD");
const CoinPrice = require("../helpers/CoinPrice");
const USDValueFrom = require("../helpers/USDValueCalculation");

class HoldingAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.bitclout.com";
  }

  async getHolding(PublicKeysBase58Check) {
    const myHeaders = {
      "Content-Type": "application/json",
    };
    try {
      const res = await Promise.all([
        this.post(
          `/get-users-stateless?shared_secret=`,
          {
            PublicKeysBase58Check: [PublicKeysBase58Check],
          },
          {
            headers: myHeaders,
          }
        ),
        this.get("https://blockchain.info/ticker"),
        this.get("https://api.bitclout.com/get-exchange-rate"),
      ]);
      const holding = res[0];
      const USD = res[1].USD.last;
      const satoshi = res[2].SatoshisPerBitCloutExchangeRate;
      const USDValue = bitCloutUSD(satoshi, USD);

      const data = {
        BalanceBitClout: nanosToBitClout(holding.UserList[0].BalanceNanos),
        user: holding.UserList[0].ProfileEntryResponse,
        holdings: holding.UserList[0].UsersYouHODL.map((item) => {
          const CoinsInCirculationNanos =
            item.ProfileEntryResponse.CoinEntry.CoinsInCirculationNanos;

          (item = {
            ...item,
            BalanceBitClout: nanosToBitClout(item.BalanceNanos),
            BalanceUSD: nanosToBitClout(item.BalanceNanos) * USDValue,
            USDValuePrice: USDValueFrom(
              USDValue,
              nanosToBitClout(CoinsInCirculationNanos),
              nanosToBitClout(item.BalanceNanos)
            ),
          }),
            (item.ProfileEntryResponse.CoinEntry = {
              ...item.ProfileEntryResponse.CoinEntry,
              CoinsInCirculationBitClout: nanosToBitClout(
                CoinsInCirculationNanos
              ),
              CoinPriceUSD: CoinPrice(
                nanosToBitClout(CoinsInCirculationNanos),
                USDValue
              ),
              BitCloutLocked: nanosToBitClout(
                item.ProfileEntryResponse.CoinEntry.BitCloutLockedNanos
              ),
            });
          return item;
        }),
      };
      return data;
    } catch (error) {
      return error;
    }
  }
}
module.exports = HoldingAPI;
