import BuyHistory from "../BuyHistory/buyHistory.component";
import CoinHoldings from "../CoinHoldings/coinHoldings.component";
import MarketSummary from "../MarketSummary/marketSummary.component";
import SellHistory from "../SellHistory/sellHistory.component";
import WalletCards from "../WalletCards/walletCards.component";
import { Style } from "./main.styles";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { GET_BUY_AND_SELL_TRANSACTIONS } from "../../../../graphql/Transaction-graphql";
import { GET_USER_YOU_HODL } from "../../../../graphql/Holding-graphql";
import Loader from "../../Loader/loader.component";
import { useEffect, useState } from "react";

function Main() {
  const [tdata, setTdata] = useState(undefined);

  const payload = JSON.parse(localStorage.getItem("identity"));
  console.log(payload);

  const buyAndSellTransactions = useQuery(GET_BUY_AND_SELL_TRANSACTIONS, {
    variables: {
      userpublickey: payload?.publicKey,
    },
  });

  const holdingData = useQuery(GET_USER_YOU_HODL, {
    variables: {
      PublicKeyBase58Check: payload?.publicKey,
    },
  });

  console.log(buyAndSellTransactions.data);
  console.log(holdingData.data?.holding);

  useEffect(async () => {
    if (buyAndSellTransactions.data !== undefined) {
      let trandata = buyAndSellTransactions.data;
      let trantemp = [...trandata.user_check];
      let logs = [];
      let prvlocked = 0;
      let prvcirculation = 0;
      for (let i = 0; i < trantemp.length; i++) {
        let locked = 0;
        let circulation = 0;
        if (trantemp[i].transactiontype == 0) {
          let templock =
            (trantemp[i].BitCloutToSellNanos / 1000000000) * 0.9999;
          templock = Math.floor(templock * 1000000000) / 1000000000;
          locked = prvlocked + templock;
          circulation = Math.pow(locked, 0.33333333333333333) * 10;
        } else {
          let coins =
            Math.ceil(trantemp[i].CreatorCoinToSellNanos) / 1000000000;
          circulation = prvcirculation - coins;
          locked = Math.pow(circulation, 3) / 1000;
        }
        let d = new Date(trantemp[i].timestamp * 1000);

        const response = await fetch(
          `/api/profile/pub/${trantemp[i].transactorpublickey}`,
          {
            method: "POST",
          }
        );

        //BC1YLgkP72LrZ9HCVYzWXSzE2YrNsNyXUGs54MhAVPXbsTkbk4EgkaK

        const res_profile = await response.json();
        let username = trantemp[i].transactorpublickey;
        let pic = "";
        if (res_profile?.data?.Username) {
          username = res_profile?.data?.Username;
        }
        if (res_profile?.data?.ProfilePic) {
          pic = res_profile?.data?.ProfilePic;
        }

        logs = [
          ...logs,
          {
            locked: locked,
            circulation: circulation,
            coins: circulation - prvcirculation,
            date: d.toDateString(),
            username: username,
            userpic: pic,
            ...trantemp[i],
          },
        ];
        prvlocked = locked;
        prvcirculation = circulation;
        if((i + 1) % 30 == 0)
        {
          await new Promise((resolve) => setTimeout(resolve, 10000));
        }
      }
      console.log("newTran:", {
        user_check: logs,
        ExchangeRate: trandata.ExchangeRate,
      });
      setTdata({
        user_check: logs,
        ExchangeRate: trandata.ExchangeRate,
      });
    }
  }, [buyAndSellTransactions]);
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  return (
    <Style.Container className="main" dark={darkTheme}>
      {holdingData.data?.holding ? (
        <WalletCards data={holdingData.data?.holding} dark={darkTheme} />
      ) : (
        <p className="no-t-h">Your card data is not available</p>
      )}
      {holdingData.loading === true ? (
        <Loader />
      ) : holdingData.data?.holding.UsersYouHODL ? (
        <CoinHoldings
          holdingData={holdingData.data?.holding.UsersYouHODL}
          dark={darkTheme}
        />
      ) : (
        <p className="no-t-h">You have no current coin holding</p>
      )}
      {buyAndSellTransactions.data ? (
        <div className="buy-sell-history">
          <BuyHistory transactionData={tdata} dark={darkTheme} />
          <SellHistory transactionData={tdata} dark={darkTheme} />
        </div>
      ) : (
        <p className="no-t-h">You have no transaction history</p>
      )}
      {/* {holdingData.loading === true ? (
        ""
      ) : (
        <MarketSummary
          holdingUsers={holdingData.data?.holding.UsersYouHODL}
          dark={darkTheme}
        />
      )} */}
    </Style.Container>
  );
}

export default Main;
