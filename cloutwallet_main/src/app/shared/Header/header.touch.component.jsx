import { Style } from "./header.styles";
import Logo from "../Logo/logo.component";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { purgeStoredState } from "redux-persist";
import { persistConfig } from "../../../store/index";
import { useDispatch, useSelector } from "react-redux";
import gsap from "gsap";
import { SwitchTransition, Transition } from "react-transition-group";
import ThemeButton from "../../components/Theme/theme.component";

function enter(node) {
  gsap.from(node, {
    duration: 0.25,
    autoAlpha: 0,
    x: 100,
  });
}

function exit(node) {
  gsap.to(node, {
    duration: 0.25,
    autoAlpha: 0,
    x: 100,
  });
}

function HeaderTouch() {
  const [menu, setMenu] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const dark = useSelector((state) => state.theme.darkTheme);

  function activeCheck(str) {
    if (router.pathname === str) {
      return true;
    }
  }

  function menuHandler() {
    if (menu) {
      setMenu(false);
    } else {
      setMenu(true);
    }
  }

  function logOut() {
    setMenu(false);
    router.push("/login");
    purgeStoredState(persistConfig);
    setTimeout(() => {
      dispatch({ type: "USER_LOGOUT" });
    }, 0);
  }

  return (
    <Style.T_Container dark={dark}>
      <Logo mode="blue" />

      <ThemeButton />

      <button className="header-button" onClick={menuHandler}>
        <SwitchTransition>
          <Transition
            key={menu}
            timeout={250}
            in={menu}
            onEnter={enter}
            onExit={exit}
            mountOnEnter={true}
            unmountOnExit={true}
          >
            <span>{menu ? "CLOSE" : "MENU"}</span>
          </Transition>
        </SwitchTransition>
      </button>

      <Transition
        key="menu-options-transition"
        timeout={250}
        in={menu}
        onEnter={enter}
        onExit={exit}
        mountOnEnter={true}
        unmountOnExit={true}
      >
        {(state) => (
          <div className="menu-options">
            <Link href="/user">
              <Style.Span
                onClick={() => setMenu(false)}
                active={activeCheck("/user")}
                dark={dark}
              >
                Your Wallet
              </Style.Span>
            </Link>
            <Link href="/market-overview">
              <Style.Span
                active={activeCheck("/market-overview")}
                onClick={() => setMenu(false)}
                dark={dark}
              >
                Market Overview
              </Style.Span>
            </Link>
            <Link href="/order-history">
              <Style.Span
                active={activeCheck("/order-history")}
                onClick={() => setMenu(false)}
                dark={dark}
              >
                Order History
              </Style.Span>
            </Link>
            <Style.Span onClick={logOut} dark={dark}>
              Log Out
            </Style.Span>
          </div>
        )}
      </Transition>
    </Style.T_Container>
  );
}

export default HeaderTouch;
