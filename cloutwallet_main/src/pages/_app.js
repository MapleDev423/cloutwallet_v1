import React from "react";
import { Provider } from "react-redux";
import GlobalStyle from "../styles/GlobalStyle";
import styled from "styled-components";
import store from "../store/index";
import "./_app.css";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { AutoSaveProvider } from "../firebase/AutoSaveProvider";
import { ApolloProvider } from "@apollo/client";
import client from "../graphql/apollo-client";

let persistor = persistStore(store);

const PageContent = styled.div`
  height: 100%;
`;

export default function App({ Component, pageProps, router }) {
  return (
    <>
      <GlobalStyle />
      <Provider store={store}>
        <ApolloProvider client={client}>
          <PersistGate loading={null} persistor={persistor}>
            <PageContent>
              <AutoSaveProvider>
                <Component {...pageProps} />
              </AutoSaveProvider>
            </PageContent>
          </PersistGate>
        </ApolloProvider>
      </Provider>
    </>
  );
}
