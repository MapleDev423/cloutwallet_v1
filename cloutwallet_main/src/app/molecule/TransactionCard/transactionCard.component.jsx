import { Style } from "./transactionCard.styles";

function TransactionCard({ card }) {
  const { user, img, type, amount, btclt } = card;
  return (
    <Style.Container>
      <div className="author">
        <img src={img} alt="user" />
        <div className="details">
          <p className="details-user">{user}</p>
          <Style.Span type={type}>{type}</Style.Span>
        </div>
      </div>
      <div className="transaction">
        <p className="amount">{amount}</p>
        <span>{btclt}</span>
      </div>
    </Style.Container>
  );
}

export default TransactionCard;
