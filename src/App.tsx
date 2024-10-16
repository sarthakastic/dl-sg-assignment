import { Provider } from "react-redux";
import { store } from "./redux/store";
import Routing from "./routes/Routing";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routing />
      </Router>
    </Provider>
  );
}

export default App;
