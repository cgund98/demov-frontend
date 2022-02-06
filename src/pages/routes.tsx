import {AnimatePresence} from 'framer-motion';
import React, {useEffect} from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';

import {useAppDispatch} from 'state';
import {reset} from 'state/errors/errors';

import Home from './home/Home';
import JoinParty from './join-party/JoinParty';
import NewParty from './new-party/NewParty';
import SwipeParty from './swipe-party/SwipeParty';
import WaitingRoom from './waiting-room/WaitingRoom';
import ShowMovie from './show-movie/ShowMovie';

const router: React.FC = () => {
  const location = useLocation();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(reset());
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<JoinParty />} />
        <Route path="/new" element={<NewParty />} />
        <Route path="/party/:partyId/wait" element={<WaitingRoom />} />
        <Route path="/party/:partyId" element={<SwipeParty />} />
        <Route path="/movie/:movieId" element={<ShowMovie />} />
      </Routes>
    </AnimatePresence>
  );
};

export default router;
