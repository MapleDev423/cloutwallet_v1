import React from "react";
import { Style } from "./label.styles";

const Label = React.forwardRef(({ children, variant }, ref) => {
  return (
    <Style.Container ref={ref}>
      <label className={variant}>{children}</label>
    </Style.Container>
  );
});

export default Label;
