import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";

import GlobalStyle from "../styles/GlobalStyle";
import theme from "../styles/Theme";
import styled from "styled-components";
import { store } from "../store/index";
import "./_app.css";
import { SwitchTransition, Transition } from "react-transition-group";
import gsap from "gsap";

const PageContent = styled.div``;
function enter(node) {
  gsap.from(node, {
    duration: 0.25,
    autoAlpha: 0,
  });
}

function exit(node) {
  gsap.to(node, {
    duration: 0.25,
    autoAlpha: 0,
  });
}

export default function App({ Component, pageProps, router }) {
  return (
    <>
      <GlobalStyle />
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <PageContent>
            <SwitchTransition>
              <Transition
                key={router.pathname}
                timeout={250}
                in={true}
                onEnter={enter}
                onExit={exit}
                mountOnEnter={true}
                unmountOnExit={true}
              >
                <Component {...pageProps} />
              </Transition>
            </SwitchTransition>
          </PageContent>
        </ThemeProvider>
      </Provider>
    </>
  );
}
