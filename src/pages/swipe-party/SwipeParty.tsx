import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import FadeOut from 'components/animation/fadeOut';
import Container from 'components/layout/container';
import BottomNav from 'components/nav/bottomNav';
import Results from './Results';
import Swiping from './Swiping';

const SwipeParty: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.hash.split('#')[1];

  // Avoid results page loading in again on redirect
  let content = location.pathname.split('/')[1] === 'party' ? <Swiping /> : null;
  if (mode === 'results') content = <Results />;

  return (
    <Container>
      {content}

      <div className="fixed bottom-8 inset-x-0">
        <FadeOut standalone>
          <div className="flex flex-row justify-center z-30">
            <BottomNav swiping={mode !== 'results'} onChange={m => navigate(`${location.pathname}#${m}`)} />
          </div>
        </FadeOut>
      </div>
    </Container>
  );
};

export default SwipeParty;
