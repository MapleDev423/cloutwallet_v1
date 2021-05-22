import { useEffect, useState } from "react";
import uuid from "react-uuid";

export function useWCS_DATA(props) {
  const [data, setData] = useState({
    id: uuid(),
    img: "/wallets/wallet.svg",
    title: "Total USD Value",
    value: "",
    btc_value: "",
  });

  useEffect(() => {
    if (props !== undefined) {
      const { TotalPriceHeldUSD, BalanceUSD } = props;

      const busd = TotalPriceHeldUSD.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      const bbc = BalanceUSD.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      setData({
        ...data,
        value: busd,
        btc_value: bbc,
      });
    }
  }, [props]);

  return data;
}
