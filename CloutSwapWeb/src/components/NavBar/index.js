import React from "react";
import Tab from "../Tab";
import Logo from "../Logo";

const Index = (props) => {
  const { wallet } = props;

  const onConnectToWalletButton = () => {
    wallet.connect();
  };

  const onDisconnectFromWalletButton = () => {
    wallet.reset();
  };

  console.log("wallet", wallet);

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <Logo />

      <div style={{ display: "flex" }}>
        <Tab selected={true}>Swap</Tab>
        <Tab>Pool</Tab>
        <Tab>About CloutSwap</Tab>
        <Tab>Vote</Tab>
      </div>

      <div style={{ display: "flex" }}>
        {wallet.status === "connected" && (
          <Tab onClick={onDisconnectFromWalletButton}>
            Disconnect From Wallet {wallet.getBlockNumber()}
          </Tab>
        )}

        {wallet.status === "disconnected" && (
          <Tab onClick={onConnectToWalletButton}>Connect To Wallet</Tab>
        )}

        {wallet.status === "connecting" && <Tab>Connecting...</Tab>}

        {wallet.status === "error" && (
          <Tab onClick={onConnectToWalletButton}>Try Again</Tab>
        )}

        <Tab>Dark Mode</Tab>
      </div>
    </div>
  );
};

export default Index;
