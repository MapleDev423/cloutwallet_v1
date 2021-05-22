import Link from "next/link";
import { PagesList, PageLink } from "./styles";
import { useRouter, NextRouter } from "next/router";

const LoginAndSignUp = () => {
  const router: NextRouter = useRouter();
  return (
    <PagesList>
      {/* <PageLink>Methodology</PageLink> */}
      {/* <PageLink>Press Kit</PageLink> */}
      {/* <PageLink>Contact</PageLink> */}
      <Link href="/">
        <PageLink
          //   className={router.pathname === "/" ? "active" : null}
          style={{ color: "black" }}
        >
          Home
        </PageLink>
      </Link>
      <Link href="/">
        <PageLink style={{ cursor: "not-allowed" }}>Changelog</PageLink>
      </Link>
      <PageLink href="https://bitclout.com" target="_blank">
        BitClout
      </PageLink>
    </PagesList>
  );
};

export default LoginAndSignUp;
