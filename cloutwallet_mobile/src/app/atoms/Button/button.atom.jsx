import React from "react";
import { Style } from "./button.styles";

const Button = React.forwardRef(
  ({ onClick, href, children, ...props }, ref) => {
    return (
      <Style.Container href={href} onClick={onClick} ref={ref} {...props}>
        {children}
      </Style.Container>
    );
  }
);

export default Button;
