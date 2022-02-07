import {AnimatePresence} from 'framer-motion';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {RootState, useAppDispatch} from 'state';
import {getMovie} from 'state/movie/movie';

import FadeOut from '../../components/animation/fadeOut';
import IconButton from '../../components/buttons/iconButton';
import ArrowLeft from '../../components/icons/arrowLeft';
import Container from '../../components/layout/container';
import MovieCard from '../../components/movies/movieCard';

const SwipeParty: React.FC = () => {
  const navigate = useNavigate();

  // Route params
  const {movieId} = useParams();
  if (movieId === undefined) return null;

  // Redux
  const dispatch = useAppDispatch();
  const {movie} = useSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(getMovie(movieId));
  }, [movieId]);

  const curMovie = movie.movies?.[movieId];

  return (
    <Container>
      <div>
        <div className="relative h-[80vh]">
          <AnimatePresence exitBeforeEnter>
            {curMovie ? <MovieCard key={movieId} movie={curMovie} /> : null}
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute left-4 bottom-10 z-40">
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
