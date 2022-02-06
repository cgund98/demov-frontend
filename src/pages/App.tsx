import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import store from 'state';
import ErrorWrapper from 'components/errors/errorWrapper';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <div className="relative w-screen h-screen overflow-x-hidden text-gray-900">
      <Provider store={store}>
        <BrowserRouter>
          <ErrorWrapper />
          <Routes />
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
