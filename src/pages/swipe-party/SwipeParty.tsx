import React from 'react';

import Container from '../../components/layout/container';
import MovieCard from '../../components/movies/movieCard';

const SwipeParty: React.FC = () => {
  return (
    <Container>
      <MovieCard name="Blade Runner 2049" />
    </Container>
  );
};

export default SwipeParty;
