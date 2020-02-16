import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Navigation from './src/navigation/Navigation';
import {store, persistor} from './src/store/config';

export default function App() {
  return (
    <Provider store={ store }>
      <PersistGate loading={null} persistor={ persistor }>
        <Navigation/>
      </PersistGate>
    </Provider>
  );
}
