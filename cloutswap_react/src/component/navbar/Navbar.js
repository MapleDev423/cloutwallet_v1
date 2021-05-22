import React, { useState } from "react";
// import brand from '../../assets/icons/brand.svg'
import { IconButton, SimpleButton } from "../buttons";
import "./index.css";
import moon from "../../assets/icons/moon.svg";
import ConnectWalletModal from "../modals/ConnectWalletModal";
// import dots from '../../assets/icons/dots.svg'

export default function Navbar() {
  const [isOpen, setOpenModal] = useState(false);
  return (
    <div className="navbar">
      <div className="navlinks">
        <div className="brand">
          <img alt="Logo" src="https://i.ibb.co/zXsPJhy/Clout-Swap-Logo.png" />
        </div>
      </div>
      <div className="links">
        <p className="link active">Swap</p>
        <p className="link">Pool</p>
        <p className="link">About CloutSwap</p>
        <p className="link">Vote</p>
      </div>
      <div className="navbuttons">
        <SimpleButton
          text="Connect to Wallet"
          onClick={() => setOpenModal(true)}
        />
        <IconButton icon={moon} />
      </div>
      <ConnectWalletModal
        isOpen={isOpen}
        closeModal={() => setOpenModal(false)}
      />
    </div>
  );
}
