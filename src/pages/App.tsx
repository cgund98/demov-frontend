import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <div className="relative w-screen h-screen overflow-x-hidden text-gray-900">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
};

export default App;
