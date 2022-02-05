import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import Routes from './routes';
import store from '../state';

const App: React.FC = () => {
  return (
    <div className="relative w-screen h-screen overflow-x-hidden text-gray-900">
      <Provider store={store}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
