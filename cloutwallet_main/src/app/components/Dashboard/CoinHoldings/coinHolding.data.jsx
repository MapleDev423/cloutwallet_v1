import { useMemo } from "react";

export function useCH_DATA(props) {
  const columns = useMemo(
    () => [
      {
        Header: "Creator Coins",
        accessor: "col1", // accessor is the "key" in the data
        Cell: ({ cell: { value } }) => {
          const profile = value.profile;
          const name = value.name;
          return (
            <div className="cc-name">
              <img src={profile} alt={name} />
              <div className="cc-details">
                <p>{name}</p>
              </div>
            </div>
          );
        },
      },
      {
        Header: "Coin Price",
        accessor: "BalanceBitClout",
        Cell: ({ cell: { value } }) => {
          return `$${value.toLocaleString()}`;
        },
      },
      {
        Header: "Coins Held",
        accessor: "BalanceUSD",
      },
      {
        Header: "USD Value",
        accessor: "USDValuePrice", // accessor is the "key" in the data
        Cell: ({ cell: { value } }) => {
          return <span>$ {value}</span>;
        },
      },
      {
        Header: "Supply Held",
        accessor: "SupplyPercent",
        Cell: ({ cell: { value } }) => {
          return `${value}%`;
        },
      },
      {
        Header: "Portfolio",
        accessor: "PortfolioPercent",
        Cell: ({ cell: { value } }) => {
          return `${value}%`;
        },
      },
    ],
    []
  );

  const newArray = props
    .map(function (prop) {
      return {
        col1: {
          profile: prop.ProfileEntryResponse.ProfilePic,
          name: prop.ProfileEntryResponse.Username,
        },
        BalanceBitClout: prop.ProfileEntryResponse.CoinEntry.CoinPriceUSD.toFixed(
          2
        ),
        BalanceUSD: prop.BalanceBitClout.toFixed(2),
        USDValuePrice: prop.USDValuePrice.toFixed(2),
        SupplyPercent: prop.SupplyPercent.toFixed(2),
        PortfolioPercent: prop.PortfolioPercent.toFixed(2),
      };
    })
    .sort((a, b) => +b.BalanceUSD - +a.BalanceUSD);

  const data = useMemo(() => newArray, []);

  return { data, columns };
}
