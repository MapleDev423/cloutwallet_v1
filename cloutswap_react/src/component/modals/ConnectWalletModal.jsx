import React, { useState } from "react";
import Modal from "react-modal";
// import cloutWallet from '../../assets/icons/cloutWallet.svg';
import metaWallet from "../../assets/icons/metaMask.png";
import closeSmall from "../../assets/icons/close_small.svg";

import "./index.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const ConnectWalletModal = (props) => {
  const [active, setActive] = useState(0);
  return (
    <Modal
      isOpen={props.isOpen ? true : false}
      onRequestClose={props.closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="con_wallet_container text-16 bold">
        <p className="text-22 mt-10 text-center">Connect to a wallet</p>
        <div
          className={`item flex justify-between ${
            active === 0 ? "active" : ""
          }`}
          style={{ marginTop: "50px" }}
          onClick={() => setActive(0)}
        >
          <p>CloutWallet</p>
          {/* <img src={cloutWallet} alt="wallet"/> */}
        </div>
        <div
          className={`mt-10 item flex justify-between ${
            active === 1 ? "active" : ""
          }`}
          onClick={() => setActive(1)}
        >
          <p>MetaMask</p>
          <img src={metaWallet} alt="meta" />
        </div>
        <div
          className="swapcard_btn"
          onClick={() => console.log("click connect button")}
        >
          <p>Connect</p>
        </div>
        <img
          className="close_modal"
          src={closeSmall}
          alt="close"
          onClick={() => props.closeModal()}
        />
      </div>
    </Modal>
  );
};

export default ConnectWalletModal;
