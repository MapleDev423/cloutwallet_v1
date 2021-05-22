import History from "../../../molecule/History/history.component";
import Loader from "../../Loader/loader.component";
import { useSELL_DATA } from "./sellHistory.data";

function SellHistory({ dark, transactionData }) {
  if (transactionData === undefined) {
    return <Loader />;
  }

  const { data, columns } = useSELL_DATA(transactionData);
  return (
    <History dark={dark} columns={columns} data={data} title="Sell History" />
  );
}

export default SellHistory;
