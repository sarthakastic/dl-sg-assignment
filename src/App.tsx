import { Provider } from 'react-redux';
import { store } from './redux/store';
import Routing from './routes/Routing';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/commonUI/Layout';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routing />
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
