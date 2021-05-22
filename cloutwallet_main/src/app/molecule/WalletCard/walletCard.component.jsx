import { Style } from "./walletCard.styles";

function WalletCard({ data, dark }) {
  const { img, title, value, btc_value } = data;
  return (
    <Style.Container dark={dark}>
      <div className="wc-img-holder">
        <img src={img} alt="title" />
      </div>
      <div className="wc-details">
        <h2>{title}</h2>
        <div className="wc-values">
          <p>${value}</p>
          <span>${btc_value}</span>
        </div>
      </div>
    </Style.Container>
  );
}

export default WalletCard;
