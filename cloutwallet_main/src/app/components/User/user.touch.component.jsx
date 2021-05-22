import { Style } from "./user.styles";
import HeaderTouch from "../../shared/Header/header.touch.component";
import WalletCards from "../Dashboard/WalletCards/walletCards.component";
import CoinHoldingsTouch from "../Dashboard/CoinHoldings/coinHoldings.touch.component";
import BuyHistory from "../Dashboard/BuyHistory/buyHistory.component";
import SellHistory from "../Dashboard/SellHistory/sellHistory.component";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { GET_BUY_AND_SELL_TRANSACTIONS } from "../../../graphql/Transaction-graphql";
import { GET_USER_YOU_HODL } from "../../../graphql/Holding-graphql";
import Loader from "../Loader/loader.component";
import { useEffect, useState } from "react";

function UserMobile() {
  const [tdata, setTdata] = useState(undefined)
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

  useEffect(async() => {
    if(buyAndSellTransactions.data !== undefined){
        let trandata = buyAndSellTransactions.data;
        let trantemp = [...trandata.user_check]
        let logs = [];
        let prvlocked = 0;
        let prvcirculation = 0;
        for(let i = 0;i < trantemp.length;i++){
          let locked = 0;
          let circulation = 0;
          if(trantemp[i].transactiontype == 0){
            let templock = trantemp[i].BitCloutToSellNanos / 1000000000 * 0.9999;
            templock = Math.floor(templock * 1000000000) / 1000000000;
            locked = prvlocked + templock;
            circulation = Math.pow(locked,0.33333333333333333) * 10;
          }else
          {
            let coins = Math.ceil(trantemp[i].CreatorCoinToSellNanos) / 1000000000;
            circulation = prvcirculation - coins;
            locked = Math.pow(circulation,3)/1000;
          }
          let d = new Date(trantemp[i].timestamp * 1000);
          
          const response = await fetch(`/api/profile/pub/${trantemp[i].transactorpublickey}`, {
            method: "POST",
          });

          const res_profile = await response.json();
          logs = [
            ...logs,
            {
              locked:             locked,
              circulation:        circulation,
              coins:              circulation - prvcirculation,
              date:               d.toDateString(),
              username:           res_profile.data.Username,
              userpic:            res_profile.data.ProfilePic,
              ...trantemp[i]
            }
          ]
          prvlocked = locked;
          prvcirculation = circulation;
        }
        console.log("newTran:",{
          user_check:logs,
          ExchangeRate:trandata.ExchangeRate
        })
        setTdata({
          user_check:logs,
          ExchangeRate:trandata.ExchangeRate
        })
    }
  }, [buyAndSellTransactions])

  useEffect(() => {
    console.log("the holding data is ", buyAndSellTransactions);
  }, [buyAndSellTransactions])
  const dark = useSelector((state) => state.theme.darkTheme);
  return (
    <Style.Container dark={dark}>
      <HeaderTouch dark={dark} />
      {
        holdingData.data?.holding ? (
          <WalletCards data={holdingData.data?.holding} dark={dark} />
        ) : (
          <p className="no-t-h">Your card data is not available</p>       
        )
      }
      {holdingData.loading === true ? (
        <Loader />
      ) : holdingData.data?.holding.UsersYouHODL ? (
        <CoinHoldingsTouch
          holdingData={holdingData.data?.holding.UsersYouHODL}
          dark={dark}
        />
      ) : (
        <p className="no-t-h">You have no current coin holding</p>
      )
      }
      {
        tdata ? (
          <div className="buy-sell-history" >
            <BuyHistory
              transactionData={tdata}
              dark={dark}
            />
            <SellHistory
              transactionData={tdata}
              dark={dark}
            />
          </div>
        ) :
        (
          <p className="no-t-h">You have no transaction history</p>
        )
      }
    </Style.Container>
  );
}

export default UserMobile;
