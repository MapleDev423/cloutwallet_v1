import BitcloutLogin from "../../../BitCloutLogin/BitCloutLogin";
import React from "react";
import validateJwt from "../../../BitCloutLogin/JWTValidation";
import { useDispatch } from "react-redux";
import { setPublicKey } from "./BitClout.slice";

const BitCloutLogin = () => {
  const dispatch = useDispatch();

  const responseClout = (response) => {
    console.log(response);

    dispatch(setPublicKey(response.publicKey));

    const validation = validateJwt(response.publicKey, response.jwt);
    if (validation.hasOwnProperty("exp")) {
      localStorage.setItem("identity", JSON.stringify(response));
    }

    /**
        {
            "hasExtraText": false,
            "btcDepositAddress": USER_btcDepositAddress,
            "encryptedSeedHex": USER_encryptedSeedHex,
            "network": "mainnet",
            "accessLevel":  USER_accessLevel,
            "accessLevelHmac": USER_accessLevelHmac,
            "jwt": USER_jwt
        }
        */
  };
  /**
   * Users can control access level on a per-domain and per-account basis.
   * Read more:
   * https://docs.bitclout.com/devs/identity-api#access-levels
   */
  const accessLevel = 4;
  /**
   * JWT requires access leve 2+
   * Read more:
   * https://github.com/bitclout/identity/blob/main/src/app/identity.service.ts#L115
   * https://github.com/bitclout/identity/blob/main/src/types/identity.ts#L31
   */
  const JWT = true;
  return (
    <BitcloutLogin
      accessLevel={accessLevel}
      onSuccess={responseClout}
      onFailure={responseClout}
      JWT={JWT}
      // customization={{ className: classes.loginButton }}
      // customIcon={<LockOpenIcon/>}
    />
  );
};

export default BitCloutLogin;
