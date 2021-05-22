import React from "react";
import * as fontSize from "../../utils/fontSize";

import "./index.css";

const Index = (props) => {
  const { value, onChange } = props;
  return (
    <input
      type="number"
      style={{
        width: 200,
        background: "transparent",
        fontSize: fontSize.large,
        borderWidth: 0,
        borderColor: "transparent",
        fontWeight: "bold",
        outline: "none",
      }}
      onChange={onChange}
      value={value}
      pattern="^[0-9]*[.,]?[0-9]*$"
      inputMode="decimal"
      placeholder="0.0"
      spellCheck={false}
      autoComplete="off"
    />
  );
};

export default Index;
