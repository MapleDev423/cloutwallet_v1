import BuyHistory from "../Dashboard/BuyHistory/buyHistory.component";
import SellHistory from "../Dashboard/SellHistory/sellHistory.component";
import { Style } from "./orderHistory.styles";
import { useSelector } from "react-redux";

function OrderHistory({ data }) {
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  return (
    <Style.Container dark={darkTheme}>
      <h1 className="oh-title">Order History</h1>
      <button className="oh-button">
        <span>Search Creator Coins</span>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.70711 0.292893C10.0676 0.653377 10.0953 1.22061 9.7903 1.6129L9.70711 1.70711L5.70711 5.70711C5.34662 6.06759 4.77939 6.09532 4.3871 5.7903L4.29289 5.70711L0.292893 1.70711C-0.0976305 1.31658 -0.0976305 0.683418 0.292893 0.292893C0.653378 -0.0675907 1.22061 -0.0953203 1.6129 0.209705L1.70711 0.292893L5 3.585L8.29289 0.292893C8.65338 -0.0675907 9.22061 -0.0953203 9.6129 0.209705L9.70711 0.292893Z"
            fill="#0A1629"
          />
        </svg>
      </button>
      {
        (data && darkTheme) ? (
          <div className="buy-sell-history">
            <BuyHistory transactionData={data} dark={darkTheme} />
            <SellHistory transactionData={data} dark={darkTheme} />
              </div>
            ) :
            (
              <p className="no-t-h">You have no transaction history</p>
            )
      }
    </Style.Container>
  );
}

export default OrderHistory;
