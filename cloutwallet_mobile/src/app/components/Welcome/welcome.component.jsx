import { Style } from "./welcome.styles";
import Logo from "../../shared/Logo/logo.component";
import Button from "../../atoms/Button/button.atom";
import Link from "next/link";

function Welcome() {
  return (
    <Style.Container>
      <Logo mode="dark" />
      <p className="title">
        Everything You’ve Ever Wanted Out Of Your BitClout Wallet
      </p>
      <Link href="/login">
        <Button>
          <span>Get Started</span>
        </Button>
      </Link>
      <p className="subtitle">We will never ask for your key phrase</p>
    </Style.Container>
  );
}

export default Welcome;
