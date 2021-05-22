import React from "react";
import { Style } from "./button.styles";

const Button = React.forwardRef(
  ({ onClick, className, href, children, ...props }, ref) => {
    return (
      <Style.Container
        className={className}
        href={href}
        onClick={onClick}
        ref={ref}
        {...props}
      >
        {children}
      </Style.Container>
    );
  }
);

export default Button;
