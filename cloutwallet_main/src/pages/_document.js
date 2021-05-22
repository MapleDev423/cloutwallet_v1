import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link rel="canonical" href="https://cloutwallet.io" />
          <meta name="theme-color" content="#3854FC" />
          <meta property="og:color" content="#3854FC" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="cloutwallet.io" />
          <meta property="og:url" content="https://cloutwallet.io" />
          <meta
            property="og:title"
            content="CloutWallet | Manage your BitClout anytime, anywhere"
          />
          <meta
            name="twitter:title"
            content="CloutWallet | Manage your BitClout anytime, anywhere"
          />
          <meta property="twitter:url" content="https://cloutwallet.io"></meta>
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:creator" content="" />
          <meta
            name="twitter:description"
            content="The first wallet app to manage your creator tokens and track your BitClout gains"
          />
          <meta property="twitter:image" content="/favicon.png" />
          <meta property="og:image" content="/favicon.png" />
          <meta
            property="og:description"
            content="The first wallet app to manage your creator tokens and track your BitClout gains"
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
