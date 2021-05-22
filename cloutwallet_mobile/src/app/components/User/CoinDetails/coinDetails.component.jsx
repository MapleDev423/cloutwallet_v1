import CoinCard from "../../../molecule/CoinCard/coinCard.component";
import { Style } from "./coinDetails.styles";
import { COIN_DATA } from "./coinDetails.data";

function CoinDetails() {
  return (
    <Style.Cointainer>
      <h2>Iaan's Wallet</h2>
      <div className="cards-container">
        {COIN_DATA.map((coin) => (
          <CoinCard key={coin.key} coin={coin} />
        ))}
      </div>
    </Style.Cointainer>
  );
}

export default CoinDetails;
