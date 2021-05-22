import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@600&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/favicon.png" />
          <meta charSet="utf-8" />
          <link rel="canonical" href="https://bitclout.io" />
          <meta
            name="description"
            content="Everything You’ve Ever Wanted Out Of Your BitClout Wallet"
          />
          <meta name="theme-color" content="#3854FC" />
          <meta property="og:color" content="#3854FC" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="bitclout.io" />
          <meta property="og:url" content="https://bitclout.io" />
          <meta
            property="og:title"
            content="CloutWallet | Manage your BitClout anytime, anywhere"
          />
          <meta
            name="twitter:title"
            content="CloutWallet | Manage your BitClout anytime, anywhere"
          />
          <meta property="twitter:url" content="https://bitclout.io"></meta>
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:creator" content="" />
          <meta
            name="twitter:description"
            content="The first digital wallet to manage your creator tokens and track your BitClout gains."
          />
          <meta property="twitter:image" content="/favicon.png" />
          <meta property="og:image" content="/favicon.png" />
          <meta
            property="og:description"
            content="Everything You’ve Ever Wanted Out Of Your BitClout Wallet"
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
