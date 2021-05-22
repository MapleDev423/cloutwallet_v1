import React from "react";
import { NavBar, Button, Text, Input } from "../../components";
import { useWallet } from "use-wallet";

import * as fontSize from "../../utils/fontSize";
import * as color from "../../utils/color";

import DropDownIcon from "../../assets/dropdown_w.svg";

const Index = (props) => {
  const [firstTokenValue, setFirstTokenValue] = React.useState(0);
  const [secondTokenValue, setSecondTokenValue] = React.useState(0);

  const wallet = useWallet();

  return (
    <div>
      <NavBar wallet={wallet} />
      <div
        style={{
          width: "33%",
          background: "#eeeeee",
          padding: 20,
          margin: "auto",
          borderRadius: 10,
          marginTop: 50,
        }}
      >
        <Text center fontSize={fontSize.large} fontWeight="bold">
          Swap
        </Text>

        {/* swap from view start */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <p>Swap from</p>
            <Input
              onChange={(evt) => {
                setFirstTokenValue(evt.target.value);
              }}
              value={firstTokenValue}
            />
            <p>Balance : 0</p>
          </div>

          <Button selectToken>
            <Text fontSize={fontSize.medium}>ETH</Text>
            <img src={DropDownIcon} alt="dropdown" />
          </Button>
        </div>

        {/* swap from view end */}

        {/* divider start */}

        <div style={{ height: 1, background: "#000000" }}></div>

        {/* divider end */}

        {/* swap to view start */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <p>Swap from</p>
            <Input
              onChange={(evt) => {
                setSecondTokenValue(evt.target.value);
              }}
              value={secondTokenValue}
            />
            <p>Balance : {wallet.balance}</p>
          </div>

          <Button selectToken>
            <Text fontSize={fontSize.medium}>UNI</Text>
            <img src={DropDownIcon} alt="dropdown" />
          </Button>
        </div>

        {/* swap to view end */}

        {/* swap button start */}

        <Button>
          <Text color={color.white} fontSize={fontSize.medium}>
            Enter an amount
          </Text>
        </Button>

        {/* swap button end */}
      </div>
    </div>
  );
};

export default Index;
