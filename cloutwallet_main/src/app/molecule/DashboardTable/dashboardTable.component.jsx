import { useEffect, useState } from "react";
import { Style } from "./dashboardTable.styles";
import TableHead from "../../atoms/TableHead/tableHead.atom";
import TableRow from "../../atoms/TableRow/tableRow.atom";
import { useSelector } from "react-redux";
import { nanosToBitClout } from "../../../../helpers/nanosToBitClout";
import { decimalRandom } from "../../../../helpers/decimalRandom";
import USDValueFrom from "../../../../helpers/USDValueCalculation";

import { useAutoSaveContext } from "../../../firebase/AutoSaveProvider";
import TableRowInfo from "../../components/modals/tableRowInfo.component";

function DashboardTable() {
  const creatorCoinsData = useSelector((state) => state.creatorCoins);
  const profile = useSelector((state) => state.profile);
  const { creatorCoins } = creatorCoinsData;
  const { profileData } = profile;
  const bitCloutUSD = profileData.data.BitClout_price;
  const [creatorCoinsArray, setCreatorCoinsArray] = useState([]);
  const [totalCoinsHeld, setTotalCoinsHeld] = useState();
  const [totalMarketPrice, setTotalMarketPrice] = useState();

  // these are the states for the modal
  const [username, setUsername] = useState();
  const [userimage, setUserImage] = useState();
  const [coinsHeld, setCoinsHeld] = useState();
  const [marketValue, setMarketValue] = useState();
  const [portfolio, setPortfolio] = useState();
  const [supplyHeld, setSupplyHeld] = useState();
  const [gainloss, setGainLoss] = useState();
  const autoSaveContext = useAutoSaveContext();

  const [sortArray, setSortArray] = useState({
    category: "CreatorCoins",
    ascending: 1,
  });

  function sortData() {
    if (creatorCoins) {
      sortTable(creatorCoins.data.holdings.slice());
      /*
      return setCreatorCoinsArray(
        creatorCoins.data.holdings
          .slice()
          
          .sort((a, b) =>
            a.BalanceNanos * a.ProfileEntryResponse.CoinPriceBitCloutNanos <
            b.BalanceNanos * b.ProfileEntryResponse.CoinPriceBitCloutNanos
              ? 1
              : -1
          )  
      );
      */
    } else {
      return null;
    }
  }

  const getPercentChange = (username, currentval) => {
    const percentState = autoSaveContext.percentState;
    if (percentState && percentState.length != 0) {
      let percentItem = percentState.filter((item) => {
        return (
          item.creatorCoinsUsername.toLowerCase() == username.toLowerCase()
        );
      });
      if (percentItem.length != 0) {
        //    console.log(`username:${username},origin:${percentItem[0].USD},current:${currentval},p:${decimalRandom((currentval / percentItem[0].USD) * 100 - 100)}`)

        return decimalRandom((currentval / percentItem[0].USD) * 100 - 100);
      } else {
        return 0;
      }
    }
    return 0;
  };

  useEffect(() => {
    sortData();
  }, [creatorCoins]);

  useEffect(() => {
    sortTable(creatorCoinsArray.slice());
  }, [sortArray]);

  const sortTable = (array) => {
    if (sortArray && array.length != 0) {
      let creatorCoinsArrayTemp = array;
      switch (sortArray.category) {
        case "CreatorCoins":
          creatorCoinsArrayTemp = creatorCoinsArrayTemp.sort((a, b) => {
            return a.ProfileEntryResponse.Username >
              b.ProfileEntryResponse.Username
              ? 1 * sortArray.ascending
              : -1 * sortArray.ascending;
          });
          break;
        case "CoinPrice":
          creatorCoinsArrayTemp = creatorCoinsArrayTemp.sort((a, b) => {
            return a.ProfileEntryResponse.CoinPriceBitCloutNanos * bitCloutUSD >
              b.ProfileEntryResponse.CoinPriceBitCloutNanos * bitCloutUSD
              ? 1 * sortArray.ascending
              : -1 * sortArray.ascending;
          });
          break;
        case "CoinsHeld":
          creatorCoinsArrayTemp = creatorCoinsArrayTemp.sort((a, b) => {
            return a.BalanceNanos > b.BalanceNanos
              ? 1 * sortArray.ascending
              : -1 * sortArray.ascending;
          });
          break;
        case "MarketValue":
          // console.log("MARKETVALUE");
          creatorCoinsArrayTemp = creatorCoinsArrayTemp.sort((a, b) => {
            let fir = USDValueFrom(
              bitCloutUSD,
              nanosToBitClout(
                a.ProfileEntryResponse.CoinEntry.CoinsInCirculationNanos
              ),
              nanosToBitClout(a.BalanceNanos)
            );
            let las = USDValueFrom(
              bitCloutUSD,
              nanosToBitClout(
                b.ProfileEntryResponse.CoinEntry.CoinsInCirculationNanos
              ),
              nanosToBitClout(b.BalanceNanos)
            );
            return fir > las
              ? 1 * sortArray.ascending
              : -1 * sortArray.ascending;
          });
          break;
        case "SupplyHeld":
          // console.log("superlly");
          creatorCoinsArrayTemp = creatorCoinsArrayTemp.sort((a, b) => {
            return a.BalanceNanos /
              a.ProfileEntryResponse.CoinEntry.CoinsInCirculationNanos >
              b.BalanceNanos /
                b.ProfileEntryResponse.CoinEntry.CoinsInCirculationNanos
              ? 1 * sortArray.ascending
              : -1 * sortArray.ascending;
          });
          break;
        case "gainloss":
          // console.log("its gainloss");
          creatorCoinsArrayTemp = creatorCoinsArrayTemp.sort((a, b) => {
            const CoinsPriceA = nanosToBitClout(
              a.ProfileEntryResponse.CoinPriceBitCloutNanos
            );
            const CoinsPriceB = nanosToBitClout(
              b.ProfileEntryResponse.CoinPriceBitCloutNanos
            );

            const marketValueA = CoinsPriceA * bitCloutUSD;
            const marketValueB = CoinsPriceB * bitCloutUSD;

            const percentA = getPercentChange(
              a.ProfileEntryResponse.Username,
              decimalRandom(marketValueA)
            );
            const percentB = getPercentChange(
              b.ProfileEntryResponse.Username,
              decimalRandom(marketValueB)
            );
            return percentA > percentB
              ? 1 * sortArray.ascending
              : -1 * sortArray.ascending;
          });

          break;
      }
      setCreatorCoinsArray(creatorCoinsArrayTemp);
    }
  };
  useEffect(() => {
    const t_CoinsHeld = creatorCoins
      ? creatorCoins.data.holdings
          .map((item, id) => {
            return nanosToBitClout(item.BalanceNanos);
          })
          .reduce((value, item) => {
            return value + item;
          }, 0)
      : 0;
    setTotalCoinsHeld(t_CoinsHeld);

    const t_MarketPrice = creatorCoins
      ? creatorCoins.data.holdings
          .map((item, id) => {
            let CoinsInCirculation = nanosToBitClout(
              item.ProfileEntryResponse.CoinEntry.CoinsInCirculationNanos
            );
            let coinsHeld = nanosToBitClout(item.BalanceNanos);
            return USDValueFrom(bitCloutUSD, CoinsInCirculation, coinsHeld);
          })
          .reduce((value, item) => {
            return value + item;
          }, 0)
      : 0;
    setTotalMarketPrice(t_MarketPrice);
  }, [creatorCoins]);

  const onTableSort = (field) => {
    // console.log(field);
    let sortArrayTemp = { ...sortArray };

    if (sortArrayTemp.category == field) {
      sortArrayTemp.ascending = -sortArrayTemp.ascending;
    } else {
      sortArrayTemp = {
        category: field,
        ascending: 1,
      };
    }

    setSortArray(sortArrayTemp);
  };

  const tableRowClick = (
    username,
    coinHeld,
    userimage,
    marketValue,
    portfolio,
    gainloss,
    supplyHeld
  ) => {
    document.getElementById("modal").style.visibility = "visible";
    document.getElementById("modal").style.opacity = 1;
    setUsername(username);
    setCoinsHeld(coinHeld);
    setUserImage(userimage);
    setMarketValue(marketValue);
    setPortfolio(portfolio);
    setGainLoss(gainloss);
    setSupplyHeld(supplyHeld);
  };

  return (
    <Style.Container>
      <table cellSpacing="0" cellPadding="0">
        <thead>
          <TableHead onTableSort={onTableSort} sortArray={sortArray} />
        </thead>
        <tbody>
          {creatorCoins ? (
            creatorCoinsArray.map((item, id) => {
              const coinsHeld = nanosToBitClout(item.BalanceNanos);
              const CoinsPrice = nanosToBitClout(
                item.ProfileEntryResponse.CoinPriceBitCloutNanos
              );
              const CoinsInCirculation = nanosToBitClout(
                item.ProfileEntryResponse.CoinEntry.CoinsInCirculationNanos
              );
              const supplyHeldPercent = (coinsHeld / CoinsInCirculation) * 100;
              const price = USDValueFrom(
                bitCloutUSD,
                CoinsInCirculation,
                coinsHeld
              );
              const portfolio = (price / totalMarketPrice) * 100;

              const marketValue = CoinsPrice * bitCloutUSD;
              const percent = getPercentChange(
                item.ProfileEntryResponse.Username,
                decimalRandom(marketValue)
              );

              return (
                <TableRow
                  onClickHandler={tableRowClick}
                  username={item.ProfileEntryResponse.Username}
                  profilePicture={item.ProfileEntryResponse.ProfilePic}
                  unitPrice={`$${decimalRandom(marketValue)}`}
                  percentageChanges={percent}
                  coinHeld={decimalRandom(coinsHeld)}
                  marketValue={`$${decimalRandom(price).toLocaleString()}`}
                  key={id}
                  supplyHeld={`${decimalRandom(supplyHeldPercent)}%`}
                  portfolio={`${decimalRandom(portfolio)}%`}
                />
              );
            })
          ) : (
            <tr className="data-center">
              {" "}
              <td colspan="6">
                Loading Creator Coin associated to this account...
              </td>{" "}
            </tr>
          )}
        </tbody>
      </table>
      <TableRowInfo
        username={username}
        userimage={userimage}
        coinHeld={coinsHeld}
        marketValue={marketValue}
        portfolio={portfolio}
        supplyHeld={supplyHeld}
        gainloss={gainloss}
      />
    </Style.Container>
  );
}

export default DashboardTable;
