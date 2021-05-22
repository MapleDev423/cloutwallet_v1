import React from "react";
import * as color from "../../utils/color";

const Index = (props) => {
  const { selected = false, children, onClick } = props;

  return (
    <div
      style={{
        display: "flex",
        height: 35,
        background: selected ? color.lightMode.primary : color.lightMode.second,
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 10,
        paddingRight: 10,
        margin: 10,
        borderRadius: 10,
        color: selected && color.white,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Index;
