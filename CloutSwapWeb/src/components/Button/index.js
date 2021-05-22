import React from "react";
import * as color from "../../utils/color";

const Index = (props) => {
  const { children, onClick, selectToken = false } = props;
  return (
    <div
      onClick={onClick}
      style={{
        height: 40,
        background: "#2244ff",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        color: color.white,
        paddingLeft: selectToken && 20,
        paddingRight: selectToken && 20,
      }}
    >
      {children}
    </div>
  );
};

export default Index;
