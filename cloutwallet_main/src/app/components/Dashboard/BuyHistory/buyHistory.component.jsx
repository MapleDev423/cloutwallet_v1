import History from "../../../molecule/History/history.component";
import Loader from "../../Loader/loader.component";
import { useBUY_DATA } from "./buyHistory.data";

function BuyHistory({ dark, transactionData }) {
  if (transactionData === undefined) {
    return <Loader />;
  }

  const { data, columns } = useBUY_DATA(transactionData);

  return (
    <History columns={columns} dark={dark} data={data} title="Coins Purchased" />
  );
}

export default BuyHistory;
