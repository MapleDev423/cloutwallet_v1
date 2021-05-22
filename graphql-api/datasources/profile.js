const { RESTDataSource } = require("apollo-datasource-rest");
const nanosToBitClout = require("../helpers/nanosToBitClout");
const bitCloutUSD = require("../helpers/bitCloutUSD");
const CoinPrice = require("../helpers/CoinPrice");

class ProfileAPI extends RESTDataSource {
  constructor() {
    super();
  }

  async getProfile(username) {
    var myHeaders = {
      "Content-Type": "application/json",
    };
    try {
      const res = await Promise.all([
        this.post(
          `https://api.bitclout.com/get-profiles`,
          {
            PublicKeyBase58Check: "",
            Username: username,
            UsernamePrefix: "",
            Description: "",
            OrderBy: "newest_last_post",
            NumToFetch: 1,
            ReaderPublicKeyBase58Check:
              "BC1YLi6LpXTemAG8T9ptyWAkMywrjynwZcKjB5DkDXxrsG5kgAwAqxq",
            ModerationType: "",
            FetchUsersThatHODL: false,
            AddGlobalFeedBool: false,
          },
          {
            headers: myHeaders,
          }
        ),
        this.get("https://blockchain.info/ticker"),
        this.get("https://api.bitclout.com/get-exchange-rate"),
      ]);
      // console.log(res[0]);

      // const newData = res.map((obj) => {
      //   return {
      //     ...obj.ProfilesFound,
      //     CoinPriceBitClout:
      //       obj.ProfilesFound[0].CoinPriceBitCloutNanos / 1000000000,
      //   };
      // });
      const profile = res[0];
      const USD = res[1].USD.last;
      const satoshi = res[2].SatoshisPerBitCloutExchangeRate;
      const USDValue = bitCloutUSD(satoshi, USD);

      const pro = {
        ProfilesFound: profile.ProfilesFound.map((item) => {
          const CoinsInCirculationBitClout = nanosToBitClout(
            item.CoinEntry.CoinsInCirculationNanos
          );
          item.CoinEntry = {
            ...item.CoinEntry,
            CoinPriceUSD: CoinPrice(CoinsInCirculationBitClout, USDValue),
            CoinsInCirculationBitClout,
          };
          return item;
        }),
      };
      console.log(pro);
      return pro;
      // return {
      //   ...profile,
      //   CoinPriceUSD:
      //     nanosToBitClout(profile.ProfilesFound[0].CoinPriceBitCloutNanos) *
      //     USDValue,
      //   CoinPriceBitClout: nanosToBitClout(
      //     profile.ProfilesFound[0].CoinPriceBitCloutNanos
      //   ),
      //   CoinsInCirculationUSD:
      //     nanosToBitClout(
      //       profile.ProfilesFound[0].CoinEntry.CoinsInCirculationNanos
      //     ) * USDValue,
      //   CoinsInCirculationBitClout: nanosToBitClout(
      //     profile.ProfilesFound[0].CoinEntry.CoinsInCirculationNanos
      //   ),
      // };
      // console.log(data);
      // return data;
    } catch (error) {
      return error;
    }
  }
}

module.exports = ProfileAPI;
