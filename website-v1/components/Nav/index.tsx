import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Wrapper, HamburgerIcon } from "./styles";
import Pages from "./Pages";
import LoginAndSignUp from "./LoginAndSignUp";
import { gradient } from "../../Color";
import MobileNav from "./MobileNav";
import Logo from "../Logo";

const Nav: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Only add darker background to nav when the user has scrolled down a bit
  useEffect(() => {
    window.onscroll = () => {
      if (window.pageYOffset > ref.current?.offsetTop) {
        ref.current.style.background = "rgba(233, 233, 233, 0.26)";
      } else {
        ref.current.style.background = "transparent";
      }
    };
  }, [ref]);

  return (
    <>
      <Wrapper ref={ref}>
        <Link href="/">
          {/* <img
                        src="/zyndicate-white-text.png"
                        alt="zyndicate logo (letter z filled with red, blue, and aquagreen) and zyndicate written filled with white"
                        style={{
                            cursor: "pointer",
                            width: "max-content",
                            height: "max-content",
                        }}
                    /> */}
          <Logo />
        </Link>
        <Pages />
        <LoginAndSignUp />

        <HamburgerIcon onClick={() => setIsOpen((v) => !v)}>
          <div></div>
          <div></div>
          <div></div>
        </HamburgerIcon>
      </Wrapper>
      <MobileNav setIsOpen={setIsOpen} isOpen={isOpen} />
    </>
  );
};

export default Nav;
