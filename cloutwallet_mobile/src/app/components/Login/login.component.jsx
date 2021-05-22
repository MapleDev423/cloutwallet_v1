import { Style } from "./login.styles";
import Button from "../../atoms/Button/button.atom";

function Login() {
  return (
    <Style.Container>
      <h1>Enter Your BitClout Username</h1>
      <input className="username" placeholder="username" />
      <Button>
        <span>ENTER</span>
      </Button>
    </Style.Container>
  );
}

export default Login;
