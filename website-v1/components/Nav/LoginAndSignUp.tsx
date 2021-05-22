import React from "react";
import { gradient } from "../../Color";
import { LoginAndSignUpContainer, Login, SignUp } from "./styles";

const LoginAndSignUp: React.FC = () => {
  return (
    <LoginAndSignUpContainer>
      <a
        rel="noreferrer noopener"
        target="_blank"
        href="https://alpha.cloutwallet.io"
      >
        <SignUp>Get access</SignUp>
      </a>
    </LoginAndSignUpContainer>
  );
};

export default LoginAndSignUp;
