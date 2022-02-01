import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Home from './home/Home';
import JoinParty from './join-party/JoinParty';
import NewParty from './new-party/NewParty';

const router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/party/join" element={<JoinParty />} />
        <Route path="/party/new" element={<NewParty />} />
      </Routes>
    </BrowserRouter>
  );
};

export default router;
