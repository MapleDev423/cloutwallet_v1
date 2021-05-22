import { useMemo } from "react";

export function useSELL_DATA(props) {
  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "userpic",
        Cell: ({ cell: { value } }) => {
          return <img src={value} />;
        },
      },
      {
        Header: "Username",
        accessor: "username", // accessor is the "key" in the data
        Cell: ({ cell: { value } }) => {
          if(value != undefined)
            return <>{value.length > 12 ? value.substring(0,12):value}</>
          else
            return <>{value}</>
        },
      },
      {
        Header: "Date",
        accessor: "date", // accessor is the "key" in the data
      },
      {
        Header: "CoinPrice",
        accessor: "price", // accessor is the "key" in the data
        Cell: ({ cell: { value } }) => {
          return <>{((value * 100) / 100).toFixed(3)}$</>;
        },
      },
    ],
    []
  );
  const filterBuy = props.user_check.filter((buy) => {
    return buy.transactiontype === 1;
  });
  const price_Bitclout_USD = props.ExchangeRate.BitCloutUSDValue;
  const newArray = filterBuy.map(function (prop) {
    const price = Math.pow(prop.circulation, 2) * price_Bitclout_USD * 0.003;

    return {
      price: price.toFixed(2),
      ...prop,
    };
  });

  const data = useMemo(() => newArray, [props]);

  return { data, columns };
}
