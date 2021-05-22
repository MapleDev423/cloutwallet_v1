import { Style } from "./dashboardCard.styles";
import { useSelector } from "react-redux";
import { nanosToBitClout } from "../../../../helpers/nanosToBitClout";
import { decimalRandom } from "../../../../helpers/decimalRandom";
import USDValueFrom from "../../../../helpers/USDValueCalculation";
import { useAutoSaveContext } from "../../../firebase/AutoSaveProvider";

function DashboardCard() {
  const profile = useSelector((state) => state.profile);
  const creatorCoinsData = useSelector((state) => state.creatorCoins);
  const autoSaveContext = useAutoSaveContext();

  const { creatorCoins } = creatorCoinsData;
  const { profileData } = profile;
  const balance = creatorCoins
    ? nanosToBitClout(creatorCoins.data.balance)
    : null;
  const bitCloutUSD = profileData.data.BitClout_price;
  const balanceUSD = balance * bitCloutUSD;
  const totalPrice = creatorCoins
    ? creatorCoins.data.holdings
        .map((item) => {
          const coinsInCir = nanosToBitClout(
            item.ProfileEntryResponse.CoinEntry.CoinsInCirculationNanos
          );
          const balance = nanosToBitClout(item.BalanceNanos);
          return USDValueFrom(bitCloutUSD, coinsInCir, balance);
        })
        .reduce((value, item) => {
          return value + item;
        }, 0)
    : 0;

  const totalPriceHeld = totalPrice + balanceUSD;

  const totalCoinsHeld = creatorCoins
    ? creatorCoins.data.holdings
        .map((item) => {
          return nanosToBitClout(item.BalanceNanos);
        })
        .reduce((value, item) => {
          return value + item;
        }, 0)
    : 0;

  const PublicKeyBase58Check = profileData.data.profile.PublicKeyBase58Check;
  const getTotalPercent = () => {
    let oldUSD = autoSaveContext.oldUserWallet.USD;
    if (oldUSD) return (totalPrice / oldUSD) * 100 - 100;
    else return 0;
  };
  const getColorClass = (num) => {
    return num > 0 ? "up" : num == 0 ? "normal" : "down";
  };
  return (
    <Style.Container>
      <div>
        <div className="coin-amount">
          <div>
            $
            {decimalRandom(totalPriceHeld).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>

          <div className={getColorClass(decimalRandom(getTotalPercent()))}>
            {`${decimalRandom(getTotalPercent())}%`}
          </div>
        </div>
        <div className="amount">
          $
          {decimalRandom(balanceUSD).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
        </div>
      </div>
      <div className="token">{PublicKeyBase58Check}</div>
    </Style.Container>
  );
}

export default DashboardCard;
