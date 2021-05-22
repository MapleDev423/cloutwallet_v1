import Cors from "cors";
import initMiddleware from "../../../../helpers/init-middleware";
import fetch from "isomorphic-unfetch";

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST"],
    origin: "https://app.cloutwallet.io/",
  })
);
export default async (req, res) => {
  await cors(req, res);

  const { method } = req;

  //the id is PublicKeyBase58Check
  const { id } = req.query;

  try {
    const req = await fetch(
      "https://api.bitclout.com/get-users-stateless?shared_secret=",
      {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          PublicKeysBase58Check: [id],
        }),
      }
    );
    const payload = await req.json();
    res.status(200).json({
      success: true,
      data: {
        user: payload.UserList[0].ProfileEntryResponse,
        holdings: payload.UserList[0].UsersYouHODL,
        balance: payload.UserList[0].BalanceNanos,
      },
    });
  } catch (e) {
    throw e;
  }
};
