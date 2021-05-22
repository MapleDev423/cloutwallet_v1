import { Style } from "./login.styles";
import Logo from "../../../shared/Logo/logo.component";
import { useSelector } from "react-redux";
import ThemeButton from "../../Theme/theme.component";
import BitCloutLogin from "../../BitCloutLogin/bitCloutLogin.component";

function Login() {
  const darkTheme = useSelector((state) => state.theme.darkTheme);

  return (
    <Style.Container dark={darkTheme}>
      <div className="first-half">
        <Logo className="fh-logo" />
        <ThemeButton />
        <h1>All of your BitClout coins in one place!</h1>
        <p>
          CloutWallet helps you access your coins on BitClout. You can now
          manage your BitClout wallet anytime, anywhere. It doesn’t get simpler
          than that. 🤙
        </p>
        <img className="login-bg" src="/login/bg.svg" alt="background" />
      </div>
      <div className="second-half">
        <Logo mode="blue" />
        <h2>Get Started</h2>
        <p>Sign in with BitClout</p>
        <div className="login-input-div">
          <BitCloutLogin />
        </div>
      </div>
    </Style.Container>
  );
}

export default Login;
