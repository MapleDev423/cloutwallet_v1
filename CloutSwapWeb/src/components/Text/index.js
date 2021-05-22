import React from "react";
import * as _fontSize from "../../utils/fontSize";

const Index = (props) => {
  const {
    children,
    color,
    fontSize = _fontSize.small,
    fontWeight,
    center,
  } = props;
  return (
    <p
      style={{
        color: color,
        fontSize: fontSize,
        fontWeight: fontWeight,
        textAlign: center && "center",
      }}
    >
      {children}
    </p>
  );
};

export default Index;
