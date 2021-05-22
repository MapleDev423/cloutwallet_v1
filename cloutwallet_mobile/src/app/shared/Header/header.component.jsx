import { Style } from "./header.styles";
import Logo from "../Logo/logo.component";
import MenuButton from "../MenuButton/menuButton.component";
import { useRouter } from "next/router";
import Link from "next/link";

function BackImg() {
  return (
    <Link href="/user">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.471 27.721L14.9129 27.2791C15.2058 26.9862 15.2058 26.5114 14.9129 26.2184L3.75703 15.0625H27.25C27.6642 15.0625 28 14.7267 28 14.3125V13.6875C28 13.2734 27.6642 12.9375 27.25 12.9375H3.75703L14.9129 1.78167C15.2058 1.48879 15.2058 1.01392 14.9129 0.720979L14.471 0.279104C14.1781 -0.0137705 13.7032 -0.0137705 13.4103 0.279104L0.219656 13.4697C-0.0732187 13.7626 -0.0732187 14.2375 0.219656 14.5304L13.4103 27.721C13.7032 28.0139 14.1781 28.0139 14.471 27.721Z" fill="white"/>
      </svg>
    </Link>
  )
}

function Header({ title, children}) {
  const router = useRouter();
  return (
    <Style.Container>
      <div className="logo-menu">
        { router.pathname === "/user" ? <Logo /> : <BackImg />}
        { title ? <p className="page-title">{title}</p> : null}
        <MenuButton />
      </div>
      <div className="details">
        <div className="coin">
          <h2>$69,420.24</h2>
          <span>21.53 $btclt</span>
        </div>
        <img src="/user-image.png" alt="user-image" />
      </div>
      {children}
    </Style.Container>
  );
}

export default Header;
