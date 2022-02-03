import {AnimatePresence} from 'framer-motion';
import React from 'react';

import CascadeParent from '../../components/animation/CascadeParent';
import FadeOut from '../../components/animation/fadeOut';
import MovieCondensed from '../../components/movies/movieCondensed';
import Header from '../../components/text/header';

const Results: React.FC = props => {
  return (
    <CascadeParent>
      <div className="flex flex-col space-y-6 pb-20">
        <FadeOut>
          <Header title="Results" />
        </FadeOut>
        <FadeOut>
          <AnimatePresence exitBeforeEnter>
            <CascadeParent>
              <div className="flow flow-col space-y-4">
                <MovieCondensed />
                <MovieCondensed />
                <MovieCondensed />
                <MovieCondensed />
                <MovieCondensed />
                <MovieCondensed />
                <MovieCondensed />
                <MovieCondensed />
              </div>
            </CascadeParent>
          </AnimatePresence>
        </FadeOut>
      </div>

      <div className="fixed inset-x-0 -bottom-2 from-gray-50 via-gray-50 to-transparent bg-gradient-to-t h-24" />
    </CascadeParent>
  );
};

export default Results;
