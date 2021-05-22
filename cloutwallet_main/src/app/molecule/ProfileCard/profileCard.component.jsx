import { Style } from "./profileCard.styles";
import { useSelector } from "react-redux";
import { nanosToBitClout } from "../../../../helpers/nanosToBitClout";
import { decimalRandom } from "../../../../helpers/decimalRandom";

function ProfileCard() {
  const profile = useSelector((state) => state.profile);
  const { profileData } = profile;
  const name = profileData.data.profile.Username;
  const img = profileData.data.profile.ProfilePic;
  const bitCloutCoins = nanosToBitClout(
    profileData.data.profile.CoinPriceBitCloutNanos
  );
  const bitCloutCoinsToUSD = decimalRandom(
    bitCloutCoins * profileData.data.BitClout_price
  );
  return (
    <Style.Container>
      <div className="">
        <img src={img} className="img-round" alt={name} />
      </div>
      <div className="flexbox">
        <div className="text-1">{name}</div>
        <div className="text-2">${bitCloutCoinsToUSD.toFixed(2)}</div>
      </div>
    </Style.Container>
  );
}

export default ProfileCard;
