import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import Routing from './routes/Routing';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/commonUI/Layout';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Layout>
            <Routing />
          </Layout>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
