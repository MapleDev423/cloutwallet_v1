import Link from "next/link";
import * as React from "react";
import { MobileLink, MobileNavStyle } from "./styles";

interface Props {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileNav: React.FC<Props> = ({ isOpen, setIsOpen }) => {
    React.useEffect(() => {
        const listener = () => {
            isOpen && setIsOpen(false);
        };

        window.addEventListener("click", listener);

        return () => window.removeEventListener("click", listener);
    }, [isOpen]);

    return (
        <MobileNavStyle isOpen={isOpen}>
            {/* <MobileLink href="#">Story</MobileLink> */}
            <Link href="/team">
                <MobileLink href="/team">Team</MobileLink>
            </Link>
            <Link href="/changelog">
                <MobileLink href="/changelog">Changelogs</MobileLink>
            </Link>
            <MobileLink
                rel="noreferrer noopener"
                target="_bank"
                href="https://web.zyndicate.app/login"
            >
                Login
            </MobileLink>
            <MobileLink
                rel="noreferrer noopener"
                target="_bank"
                href="https://web.zyndicate.app/signup"
            >
                Sign up
            </MobileLink>
        </MobileNavStyle>
    );
};

export default MobileNav;
