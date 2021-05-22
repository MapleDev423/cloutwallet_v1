import { Style } from "./coinCard.styles";

function CoinCard({ coin }) {
  const { name, amount, comp } = coin;
  return (
    <Style.Cointainer>
      <h3>{name}</h3>
      <p className="amount">{amount}</p>
      <span>{comp}</span>
    </Style.Cointainer>
  );
}

export default CoinCard;
