import TransactionCard from "../../../molecule/TransactionCard/transactionCard.component";
import { TRAN_DATA } from "./tb.slice";
import { Style } from "./tb.styles";

function TransactionsBrief() {
  return (
    <Style.Container>
      <div className="t-header">
        <h2>Transaction</h2>
        <span>View All</span>
      </div>
      <div className="t-c-cards">
        {TRAN_DATA.map((card) => (
          <TransactionCard card={card} key={card.key} />
        )).slice(0, 3)}
      </div>
    </Style.Container>
  );
}

export default TransactionsBrief;
