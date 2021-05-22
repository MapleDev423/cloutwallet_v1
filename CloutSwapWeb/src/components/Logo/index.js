import React from "react";
import * as color from "../../utils/color";

const Index = (props) => {
  return (
    <h1
      style={{
        display: "flex",
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 10,
        paddingRight: 10,
        margin: 10,
        fontSize: 24,
        color: color.lightMode.primary,
      }}
    >
      CloutSwap
    </h1>
  );
};

export default Index;
