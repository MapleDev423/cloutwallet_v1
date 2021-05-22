import { useState } from "react";
import MobileTable from "../../../molecule/MobileTable/mobileTable.component";
import { useCH_DATA } from "./coinHolding.data";
import { Style } from "./coinHoldings.styles";

function CoinHoldingsTouch({ holdingData, dark }) {
  if (holdingData === undefined) {
    return <Style.Container>""</Style.Container>;
  }
  const [currentTable, setCurrentTable] = useState("coinsHeld");
  const { data: table_data, columns: table_columns } = useCH_DATA(holdingData);

  let columns = [];
  let data = table_data;

  if (currentTable === "coinPrice") {
    columns.push(table_columns[0]);
    columns.push(table_columns[1]);
  } else if (currentTable === "coinsHeld") {
    columns.push(table_columns[0]);
    columns.push(table_columns[2]);
  } else if (currentTable === "usdValue") {
    columns.push(table_columns[0]);
    columns.push(table_columns[3]);
  } else if (currentTable === "supplyHeld") {
    columns.push(table_columns[0]);
    columns.push(table_columns[4]);
  } else if (currentTable === "portfolio") {
    columns.push(table_columns[0]);
    columns.push(table_columns[5]);
  }

  function activeChecker(str) {
    if (currentTable === str) {
      return true;
    }
  }

  return (
    <Style.T_Container dark={dark}>
      <h1>Coin Holding</h1>
      {/* <div className="ch-search">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.5605 18.4395L16.7528 14.6318C17.5395 13.446 18 12.0262 18 10.5C18 6.3645 14.6355 3 10.5 3C6.3645 3 3 6.3645 3 10.5C3 14.6355 6.3645 18 10.5 18C12.0262 18 13.446 17.5395 14.6318 16.7528L18.4395 20.5605C19.0245 21.1462 19.9755 21.1462 20.5605 20.5605C21.1462 19.9748 21.1462 19.0252 20.5605 18.4395ZM5.25 10.5C5.25 7.605 7.605 5.25 10.5 5.25C13.395 5.25 15.75 7.605 15.75 10.5C15.75 13.395 13.395 15.75 10.5 15.75C7.605 15.75 5.25 13.395 5.25 10.5Z"
            fill="#969B9F"
          />
        </svg>
        <input className="ch-search-input" placeholder="Search here..." />
      </div> */}
      <div className="ch-values">
        <Style.Span
          active={activeChecker("coinPrice")}
          onClick={() => setCurrentTable("coinPrice")}
        >
          Coin Price
        </Style.Span>
        <Style.Span
          active={activeChecker("coinsHeld")}
          onClick={() => setCurrentTable("coinsHeld")}
        >
          Coins Held
        </Style.Span>
        <Style.Span
          active={activeChecker("usdValue")}
          onClick={() => setCurrentTable("usdValue")}
        >
          USD Value
        </Style.Span>
        <Style.Span
          active={activeChecker("supplyHeld")}
          onClick={() => setCurrentTable("supplyHeld")}
        >
          Supply Held
        </Style.Span>
        <Style.Span
          active={activeChecker("portfolio")}
          onClick={() => setCurrentTable("portfolio")}
        >
          Portfolio %
        </Style.Span>
      </div>
      <MobileTable dark={dark} data={data} columns={columns} />
      <div className="see-all">
        <span>See All</span>
      </div>
    </Style.T_Container>
  );
}

export default CoinHoldingsTouch;
