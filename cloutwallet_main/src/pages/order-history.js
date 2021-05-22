import { useQuery } from "@apollo/client";
import Head from "next/head";
import OrderHistory from "../app/components/OrderHistory/orderHistory.component";
import OrderHistoryTouch from "../app/components/OrderHistory/orderHistory.touch.component";
import Layout from "../app/shared/Layout/layout.component";
import { GET_BUY_AND_SELL_TRANSACTIONS } from "../graphql/Transaction-graphql";

export default function OrderHistoryPage() {
  const payload = JSON.parse(localStorage.getItem("identity"));
  console.log(payload);

  const buyAndSellTransactions = useQuery(GET_BUY_AND_SELL_TRANSACTIONS, {
    variables: {
      userpublickey: payload?.publicKey,
    },
  });
  return (
    <div>
      <Head>
        <title>CloutWallet | Order History</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <OrderHistoryTouch data={buyAndSellTransactions.data} />
      <Layout>
        <OrderHistory data={buyAndSellTransactions.data} />
      </Layout>
    </div>
  );
}
