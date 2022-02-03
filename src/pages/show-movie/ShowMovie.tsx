import {AnimatePresence} from 'framer-motion';
import React from 'react';
import {useNavigate} from 'react-router-dom';

import FadeOut from '../../components/animation/fadeOut';
import IconButton from '../../components/buttons/iconButton';
import ArrowLeft from '../../components/icons/arrowLeft';
import Container from '../../components/layout/container';
import MovieCard from '../../components/movies/movieCard';

const SwipeParty: React.FC = () => {
  const navigate = useNavigate();

  const curElement = '12321';

  return (
    <Container>
      <div>
        <div className="relative h-[80vh]">
          <AnimatePresence exitBeforeEnter>{curElement ? <MovieCard key={curElement} /> : null}</AnimatePresence>
        </div>
      </div>

      <div className="absolute left-4 bottom-10">
        <FadeOut standalone>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </IconButton>
        </FadeOut>
      </div>
    </Container>
  );
};

export default SwipeParty;
