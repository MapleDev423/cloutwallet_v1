import { useEffect, useRef } from "react";
import { MenuStyle } from "./menu.styles";
import { useSelector } from "react-redux";
import { gsap } from "gsap";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { purgeStoredState } from "redux-persist";
import { persistConfig } from "../../../store/index";

function Menu() {
  let menuRef = useRef(null);
  const open = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const tl = gsap.timeline({ paused: true });
    if (open === "open") {
      tl.set(menuRef.current, { y: "-100vh", display: "flex" })
        .to(menuRef.current, { duration: 0.5, y: 0, ease: "power3.easeIn" })
        .play();
    } else {
      tl.to(menuRef.current, {
        duration: 0.5,
        y: "-100vh",
        ease: "power3.easeOut",
      })
        .set(menuRef.current, { y: "-100vh", display: "none" })
        .play();
    }
  }, [open]);

  function clickHandler() {
    router.push("/login");
    purgeStoredState(persistConfig);
    setTimeout(() => {
      dispatch({ type: "USER_LOGOUT" });
    }, 3000);
  }

  return (
    <MenuStyle ref={menuRef}>
      <span onClick={clickHandler}>LOG OUT</span>
    </MenuStyle>
  );
}

export default Menu;
