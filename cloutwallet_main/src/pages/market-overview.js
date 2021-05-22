import { useQuery, useLazyQuery } from "@apollo/client";
import Head from "next/head";
import MarketOverview from "../app/components/MarketOverview/marketOverview.component";
import MarketOverviewTouch from "../app/components/MarketOverview/marketOverview.touch.component";
import Layout from "../app/shared/Layout/layout.component";
import { GET_USER_YOU_HODL } from "../graphql/Holding-graphql";
import { GET_BUY_AND_SELL_TRANSACTIONS } from "../graphql/Transaction-graphql";
import { useEffect, useState } from "react";

export default function MarketOverviewPage() {
  const payload = JSON.parse(localStorage.getItem("identity"));
  const [publicKey, setPublicKey] = useState();

  const [getTxnData, { loading, data }] = useLazyQuery(
    GET_BUY_AND_SELL_TRANSACTIONS
  );

  const holdingData = useQuery(GET_USER_YOU_HODL, {
    variables: {
      PublicKeyBase58Check:
        "BC1YLhh2vtqR5E1YZKp9NTq4addJ8Y4FCdeiUDJUZ3V6BvjztQXoSmS",
    },
  });
  const getPublicKey = (key) => {
    // console.log(key);
    setPublicKey(key);
  };
  useEffect(() => {
    console.log(publicKey);
    if (publicKey !== "") {
      getTxnData({
        variables: {
          userpublickey: publicKey,
        },
      });
    }
  }, [publicKey]);
  return (
    <div>
      <Head>
        <title>CloutWallet | Market Overview</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <MarketOverviewTouch data={data} />
      <Layout>
        {holdingData.loading === true ? (
          ""
        ) : (
          <MarketOverview
            holdingData={holdingData.data?.holding.UsersYouHODL}
            trandata={data}
            getKey={getPublicKey}
          />
        )}
      </Layout>
    </div>
  );
}
