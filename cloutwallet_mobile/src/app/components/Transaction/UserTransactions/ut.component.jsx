import TransactionCard from "../../../molecule/TransactionCard/transactionCard.component";
import { TRAN_DATA } from '../../User/Transactions/transactions.data'
import { Style } from "./ut.styles";

function UT() {
  return (
    <Style.Container>
      <div className="t-header">
        <h2>pl_user's Transactions</h2>
      </div>
      <div className="t-c-cards">
        {TRAN_DATA.map((card) => (
          <TransactionCard card={card} key={card.key} />
        ))}
      </div>
    </Style.Container>
  );
}

export default UT;