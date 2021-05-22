import { useRouter } from "next/router";
import { purgeStoredState } from "redux-persist";
import { persistConfig } from "../../../store/index";
import { useDispatch } from "react-redux";
import { Style } from "./error.styles";
import Logo from "../../shared/Logo/logo.component";
import Button from "../../atoms/Button/button.atom";

function Error() {
  const router = useRouter();
  const dispatch = useDispatch();
  function clickHandler() {
    router.push("/login");
    purgeStoredState(persistConfig);
    setTimeout(() => {
      dispatch({ type: "USER_LOGOUT" });
    }, 3000);
  }

  return (
    <Style.Container>
      <Logo mode="dark" />
      <p className="title">
        Opps! The username you provided does not exist on Bitclout. Please check
        the username and try again.
      </p>

      <Button onClick={clickHandler}>
        <span>Back to Login</span>
      </Button>
    </Style.Container>
  );
}

export default Error;
