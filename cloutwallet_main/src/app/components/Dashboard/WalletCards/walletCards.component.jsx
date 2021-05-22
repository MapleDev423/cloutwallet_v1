import { useState } from "react";
import GraphWalletCard from "../../../molecule/WalletCard/graphWalletCard.component";
import WalletCard from "../../../molecule/WalletCard/walletCard.component";
import Loader from "../../Loader/loader.component";
import { useWCS_DATA } from "./wallet.data";
import { Style } from "./walletCards.styles";

function WalletCards({ dark, data }) {
  const [size, setSize] = useState(false);
  const formattedData = useWCS_DATA(data);

  if (data === undefined) {
    return(
      <Style.Container>
        <Loader />
      </Style.Container>  
    );
  }

  return (
    <Style.Container size={size ? 1 : 0} dark={dark}>
      <h1>BitClout Wallet</h1>
      <svg
        size={size ? 1 : 0}
        onClick={() => setSize(!size)}
        className="down-arrow"
        width="33"
        height="32"
        viewBox="0 0 33 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.8778 19.8052C16.6179 20.0649 16.1887 20.0649 15.929 19.8052L9.60427 13.4805C9.17509 13.0512 9.48003 12.3285 10.0786 12.3285H22.728C23.3266 12.3285 23.6315 13.0512 23.2024 13.4805L16.8778 19.8052Z"
          fill="#828282"
        />
      </svg>
      <div className="wcs-cards">
        <WalletCard
          dark={dark}
          size={size ? 1 : 0}
          key={formattedData.id}
          data={formattedData}
        />
        <GraphWalletCard dark={dark} />
      </div>
      {size ? <div className="wcs-line" /> : null}
    </Style.Container>
  );
}

export default WalletCards;
