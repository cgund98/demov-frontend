import React from 'react';

import Router from './router';

const App: React.FC = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden text-gray-900">
      <Router />
    </div>
  );
};

export default App;
