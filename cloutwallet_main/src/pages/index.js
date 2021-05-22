import Head from "next/head";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const user = useSelector((state) => state.auth);
  const router = useRouter();
  const { username } = user;

  useEffect(() => {
    if (!username) {
      router.push("/login");
    } else {
      router.push("/user");
    }
  }, [router]);

  return (
    <div>
      <Head>
        <title>CloutWallet | Manage your BitClout anytime, anywhere</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
    </div>
  );
}
