import { Style } from "./login.styles";
import Button from "../../../atoms/Button/button.atom";
import Logo from "../../../shared/Logo/logo.component";
import { useSelector } from "react-redux";
import { useState } from "react";
import ThemeButton from "../../Theme/theme.component";
import BitCloutLogin from "../../BitCloutLogin/bitCloutLogin.component";

function LoginTouch() {
  const [page, setPage] = useState("welcome");
  const darkTheme = useSelector((state) => state.theme.darkTheme);

  function currentComponent() {
    // console.log(page);
    if (page === "welcome") {
      // console.log(page);
      return (
        <Style.T_Container dark={darkTheme}>
          <div className="first-half">
            <div className="logo-div">
              <Logo />
              <ThemeButton />
            </div>
            <h1>All of your BitClout coins in one place!</h1>
            <p>
              CloutWallet helps you access your coins on BitClout. You can now
              manage your BitClout wallet anytime, anywhere. It doesn’t get
              simpler than that. 🤙
            </p>
            <img className="login-bg" src="/login/bg.svg" alt="background" />
            <Button className="header-button" onClick={() => setPage("login")}>
              <span>Enter CloutWallet</span>
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0)">
                  <path
                    d="M12.0845 0.0664062C5.82488 0.0664062 0.691073 4.85984 0.13916 10.9754H9.90281V7.7027C9.90281 7.26205 10.1689 6.86395 10.5758 6.69476C10.9839 6.52577 11.4529 6.61945 11.7649 6.93146L16.1285 11.2952C16.5551 11.7217 16.5551 12.411 16.1285 12.8377L11.7649 17.2013C11.4529 17.5133 10.9839 17.6072 10.5758 17.438C10.1679 17.269 9.90281 16.8707 9.90281 16.43V13.1573H0.13916C0.691073 19.2729 5.82488 24.0663 12.0845 24.0663C18.7118 24.0663 24.0846 18.6936 24.0846 12.0665C24.0846 5.43912 18.7118 0.0664063 12.0845 0.0664063V0.0664062Z"
                    fill={darkTheme ? "#1C2237" : "#2a64fa"}
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(0.12207 0.0664062)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </Button>
          </div>
        </Style.T_Container>
      );
    } else {
      return (
        <Style.T_Container dark={darkTheme}>
          <div className="second-half">
            <div className="logo-div">
              <Logo mode="blue" />
              <ThemeButton />
            </div>
            <h2>Get Started</h2>
            <p>Sign in with BitClout</p>
            <BitCloutLogin />
          </div>
        </Style.T_Container>
      );
    }
  }

  return currentComponent();
}

export default LoginTouch;
