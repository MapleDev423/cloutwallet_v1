import React from "react";
import { Style } from "./spinner.styles";

function Spinner(props, ref) {
  return (
    <Style.Container>
      <div className="centered">
        <div className="loader">Loading...</div>
      </div>
    </Style.Container>
  );
}

export default Spinner;
