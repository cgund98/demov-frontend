import {AnimatePresence} from 'framer-motion';
import React from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';

import Home from './home/Home';
import JoinParty from './join-party/JoinParty';
import NewParty from './new-party/NewParty';
import SwipeParty from './swipe-party/SwipeParty';
import WaitingRoom from './waiting-room/WaitingRoom';

const router: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<JoinParty />} />
        <Route path="/new" element={<NewParty />} />
        <Route path="/party/:party/wait" element={<WaitingRoom />} />
        <Route path="/party/:party" element={<SwipeParty />} />
      </Routes>
    </AnimatePresence>
  );
};

export default router;
