import React from "react";
import Icon from "./icon";
import PropTypes from "prop-types";
import Button from "../app/atoms/Button/button.atom";

// import { useDispatch, useSelector } from "react-redux";
// import { setUser } from "./login.slice";
// import { useState } from "react";
// import { useRouter } from "next/router";

// function clickHandler(user) {
//   dispatch(setUser(user));
//   router.push("/user");
// }

function initLogin(accessLevel, JWT) {
  return new Promise(function (resolve, reject) {
    function login() {
      identityWindow = window.open(
        "https://identity.bitclout.com/log-in?accessLevelRequest=" +
          accessLevel,
        null,
        "toolbar=no, width=800, height=1000, top=0, left=0"
      );
    }
    function handleInit(e) {
      if (!init) {
        init = true;

        for (const e of pendingRequests) {
          e.source.postMessage(e, "*");
        }

        pendingRequests = [];
        pm_id = e.data.id;
        source = e.source;
      }
      respond(e.source, e.data.id, {});
    }

    function handleLogin(payload) {
      user = payload["users"][payload.publicKeyAdded];
      user["publicKey"] = payload.publicKeyAdded;
      if (identityWindow) {
        if (JWT === false) {
          identityWindow.close();
          identityWindow = null;
          resolve(user);
        } else {
          var payload = {
            accessLevel: user.accessLevel,
            accessLevelHmac: user.accessLevelHmac,
            encryptedSeedHex: user.encryptedSeedHex,
          };
          source.postMessage(
            {
              id: pm_id,
              service: "identity",
              method: "jwt",
              payload: payload,
            },
            "*"
          );
        }
      }
    }

    function handleJWT(payload) {
      user["jwt"] = payload["jwt"];
      if (identityWindow) {
        identityWindow.close();
        identityWindow = null;
      }
      resolve(user);
      window.location.assign("/user");
    }

    function respond(e, t, n) {
      e.postMessage(
        {
          id: t,
          service: "identity",
        },
        "*"
      );
    }

    window.addEventListener("message", (message) => {
      const {
        data: { id: id, method: method, service: service, payload: payload },
      } = message;
      if (service !== "identity") {
        return;
      }

      if (method == "initialize") {
        handleInit(message);
      } else if (method == "login") {
        handleLogin(payload);
      } else if ("jwt" in payload) {
        handleJWT(payload);
      }
    });

    var init = false;
    var pm_id = "";
    var source = null;
    var user = null;
    var pendingRequests = [];
    var identityWindow = null;
    login();
  });
}

const BitcloutLogin = (props) => {
  const {
    accessLevel,
    onSuccess,
    onFailure,
    JWT,
    customization,
    customIcon,
    ...other
  } = props;

  const handleLogin = () => {
    initLogin(accessLevel, JWT)
      .then((e) => {
        onSuccess(e);
      })
      .catch((e) => {
        onFailure(e);
      });
  };
  return (
    <Button className="bitclout-login" onClick={handleLogin} login>
      <span> Sign in with BitClout</span>
    </Button>
  );
};

BitcloutLogin.propTypes = {
  accessLevel: PropTypes.number.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  JWT: PropTypes.bool,
  customization: PropTypes.object,
  icon: PropTypes.element,
};
export default BitcloutLogin;
