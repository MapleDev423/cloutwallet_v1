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
    query: { searchuser },
    method,
  } = req;

  console.log("we are getting the response now ", searchuser);

  try {
    let response = await fetch("https://api.bitclout.com/get-profiles", {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        PublicKeyBase58Check: "",
        Username: "",
        UsernamePrefix: searchuser,
        Description: "",
        OrderBy: "",
        NumToFetch: 5,
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

    res.status(200).json({
      success: true,
      data: {
        profile: profile.ProfilesFound,
      },
    });
  } catch (e) {
    res.status(400).json({ success: false, error: e });
    throw e;
  }
};
