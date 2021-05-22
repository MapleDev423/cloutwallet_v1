import HeaderTouch from "../../shared/Header/header.touch.component";
import BuyHistory from "../Dashboard/BuyHistory/buyHistory.component";
import SellHistory from "../Dashboard/SellHistory/sellHistory.component";
import { Style } from "./orderHistory.styles";
import { useSelector } from "react-redux";

function OrderHistoryTouch({ data }) {
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  return (
    <Style.T_Container dark={darkTheme}>
      <HeaderTouch />
      {
        data ? (
          <div className="buy-sell-history">
            <BuyHistory transactionData={data} dark={darkTheme} />
            <SellHistory transactionData={data} dark={darkTheme} />
              </div>
            ) :
            (
              <p className="no-t-h">You have no transaction history</p>
            )
      }
    </Style.T_Container>
  );
}

export default OrderHistoryTouch;
