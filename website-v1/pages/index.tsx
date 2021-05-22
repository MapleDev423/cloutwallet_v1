import Head from "next/head";
import styles from "../styles/Home.module.css";
import Nav from "../components/Nav";
import { useState } from "react";
import { gradient } from "../Color";
import { SignUp } from "../components/Nav/styles";
import { ProductMockup } from "../components/Home.styles";

export default function Home() {
  // Don't generate a random color since next ssr will generate a different one which will result in errors
  const [gradient, setGradient] = useState(["blue"]);

  return (
    <div className={styles.container}>
      <Head>
        <title>CloutWallet | Manage your BitClout anytime, anywhere</title>
      </Head>

      <Nav />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Manage your BitClout
          <br /> anytime, <span className={styles.divider}>anywhere.</span>
        </h1>

        <p className={styles.description}>
          The first digital wallet to manage your creator tokens and track your
          BitClout gains.
        </p>
        <a
          rel="noreferrer noopener"
          target="_blank"
          href="https://alpha.cloutwallet.io"
        >
          <SignUp>Take me there</SignUp>
        </a>

        <ProductMockup src="https://i.ibb.co/FBhxrp1/image1.png" />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built and maintained with ❤️ from around the world by the CloutWallet
          team.
        </a>
      </footer>
    </div>
  );
}
