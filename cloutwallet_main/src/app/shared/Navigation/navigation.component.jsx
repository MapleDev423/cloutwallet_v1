import { Style } from "./navigation.styles";
import { useRouter } from "next/router";
import { purgeStoredState } from "redux-persist";
import { persistConfig } from "../../../store/index";
import { useDispatch } from "react-redux";

function Navigation() {
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
      <ul className="nav-list">
        <li className="nav-item nav-item-active"> Wallet </li>
        <li className="nav-item" onClick={clickHandler}>
          {" "}
          Logout{" "}
        </li>
      </ul>
    </Style.Container>
  );
}

export default Navigation;
