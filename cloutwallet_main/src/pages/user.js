import Head from "next/head";
import UserMobile from "../app/components/User/user.touch.component";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../app/components/User/profile.slice";
import Router from "next/router";
import Spinner from "../app/atoms/Spinner/spinner.atom";
import Dashboard from "../app/components/Dashboard/dashboard.component";
import Error from "../app/components/Error/error.component";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/User.graphql";
import { saveUsername } from "../firebase/FirebaseHelper" 

export default function UserPage() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const username = useSelector((state) => state.auth?.username);
  const { loading, profileData, usernameIsValid } = profile;
  const [auth, setAuth] = useState(true);
  const [payload, setPayload] = useState(null);
  console.log("THE USERNAME IS: " + username);

  useEffect(() => {
    if (localStorage.getItem("identity") === null) {
      Router.push("/login");
    } else {
      setAuth(false);
      setPayload(JSON.parse(localStorage.getItem("identity")));
    }
  }, []);

  const data = useQuery(GET_USER, {
    variables: {
      PublicKeyBase58Check: payload?.publicKey,
    },
  });
  useEffect(()=>{
    if(payload?.publicKey){
      //alert(payload?.publicKey)
      saveUsername(
        payload?.publicKey
      );
    }
  },[payload])
  if (auth) {
    return <Spinner />;
  }

  function currentComponent() {

    if (data.loading) {
      return <Spinner />;
    } else {
      if (data.data) {
        return (
          <>
            <UserMobile />
            <Dashboard />
          </>
        );
      } else if (!data.error) {
        return <Error />;
      }
    }
  }

  return (
    <div style={{ height: "100%" }}>
      <Head>
        <title>CloutWallet | Dashboard</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      {currentComponent()}
    </div>
  );
}
