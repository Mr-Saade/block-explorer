import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom/cjs/react-router-dom";
import Homepage from "./Homepage";
import {Alchemy, Network} from "alchemy-sdk";

import "./App.css";
import BlockDetails from "./BlockDetails";
import BlockTxList from "./BlockTxList";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Ethereum Block Explorer</h1>
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Homepage alchemy={alchemy} />
            </Route>
            <Route path="/block/:blockNumber">
              <BlockDetails alchemy={alchemy} />
            </Route>
            <Route path="/transactions/:blockNumber">
              <BlockTxList alchemy={alchemy} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
