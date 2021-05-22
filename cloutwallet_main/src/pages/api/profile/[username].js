import fetch from "isomorphic-unfetch";
import initMiddleware from "../../../../helpers/init-middleware";
import Cors from "cors";
// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST"],
    origin: "https://app.cloutwallet.io/",
  })
);
export default async (req, res) => {
  await cors(req, res);

  const {
    query: { username },
    method,
  } = req;

  try {
    let response = await fetch("https://api.bitclout.com/get-profiles", {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
      }),
    });

    const profile = await response.json();
    if (profile.hasOwnProperty("error")) {
      return res
        .status(404)
        .json({ success: false, error: "Username does not exist" });
    }
    const massage = profile.ProfilesFound[0];
    delete massage.Posts;
    delete massage.UsersWhoHODLYou;
    delete massage.PublicKeysBase58CheckFollowedByUser;

    let price = await fetch("https://api.bitclout.com/get-exchange-rate", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const cloutRes = await price.json();

    let tickerReq = await fetch("https://blockchain.info/ticker", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const ticker = await tickerReq.json();

    const BitClout_price =
      ((ticker.USD.last / 100) * cloutRes.SatoshisPerBitCloutExchangeRate) /
      1000000;
    // console.log(BitClout_price);
    res.status(200).json({
      success: true,
      data: {
        profile: { ...massage },
        BitClout_price: BitClout_price,
      },
    });
  } catch (e) {
    res.status(400).json({ success: false, error: e });
    throw e;
  }
};
