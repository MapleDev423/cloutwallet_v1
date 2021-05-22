import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Swap from "./pages/Swap";
import { Provider } from "react-redux";
import store from "./store";

import { UseWalletProvider } from "use-wallet";

function App() {
  return (
    <UseWalletProvider
      chainId={1}
      connectors={{
        // This is how connectors get configured
        portis: { dAppId: "my-dapp-id-123-xyz" },
      }}
    >
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/swap" render={(props) => <Swap {...props} />} />
            <Route exact path="/pool" render={(props) => <div />} />
            <Route exact path="/about" render={(props) => <div />} />
            <Route exact path="/vote" render={(props) => <div />} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </UseWalletProvider>
  );
}

export default App;
