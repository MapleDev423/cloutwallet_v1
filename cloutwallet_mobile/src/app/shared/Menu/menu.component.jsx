import { useEffect, useRef } from "react";
import { MenuStyle } from "./menu.styles";
import { useSelector } from "react-redux";
import { gsap } from "gsap";

function Menu() {
  let menuRef = useRef(null);
  const open = useSelector((state) => state.menu);

  useEffect(() => {
    const tl = gsap.timeline({ paused: true });
    if (open === "open") {
      tl.set(menuRef.current, { y: "-100vh", display: "flex" })
        .to(menuRef.current, { duration: 0.25, y: 0, ease: "power3.easeIn" })
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

  return (
    <MenuStyle ref={menuRef}>
      <p>Menu</p>
    </MenuStyle>
  );
}

export default Menu;
