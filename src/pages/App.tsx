import React from 'react';

import Router from './router';

const App: React.FC = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Router />
    </div>
  );
};

export default App;
