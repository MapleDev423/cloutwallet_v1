import Head from "next/head";
import Login from "../app/components/Auth/Login/login.component";
import LoginTouch from "../app/components/Auth/Login/login.touch.component";

export default function LoginPage() {
  return (
    <div>
      <Head>
        <title>CloutWallet | Login</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <LoginTouch />
      <Login />
    </div>
  );
}
