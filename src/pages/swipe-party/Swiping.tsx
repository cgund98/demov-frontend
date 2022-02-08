import React, {useEffect, useState} from 'react';
import {AnimatePresence} from 'framer-motion';
import {useParams} from 'react-router-dom';

import MovieCard from 'components/movies/movieCard';
import ThumbButton from 'components/buttons/thumbButton';
import FadeOut from 'components/animation/fadeOut';

import {RootState, useAppDispatch} from 'state';
import {getPartyMovies, ignore, votePartyMovie} from 'state/party-movie/partyMovies';
import {useSelector} from 'react-redux';
import {getMovie, removeMovie} from 'state/movie/movie';
import Loading from 'components/layout/loading';

const pop = (array: string[]): string[] =>
  array.filter((_, index) => {
    return index < array.length - 1;
  });

const Swiping: React.FC = () => {
  const [stack, setStack] = useState<string[]>([]);
  const [liked, setLiked] = useState<boolean | undefined>(undefined);

  const {partyId} = useParams();
  if (partyId === undefined) return null;

  const dispatch = useAppDispatch();

  const {partyMovies, movie} = useSelector((state: RootState) => state);

  // On page load fetch all party movies
  useEffect(() => {
    dispatch(getPartyMovies(partyId));
  }, [partyId]);

  // When vote order updates, set the swiping stack
  useEffect(() => {
    const swiped = new Set(partyMovies.voted || []);
    const swipingOrder = partyMovies.voteOrder?.filter(id => !swiped.has(id)) || [];

    // Fetch next 10 movies
    const firstSwipes = swipingOrder.slice(swipingOrder.length - 11).reverse();
    Promise.all(firstSwipes.map(id => dispatch(getMovie(id))));

    // Update component state
    setStack(swipingOrder);
  }, [partyMovies.voteOrder]);

  const curMovieId = stack[stack.length - 1];

  // Reset liked on stack pop
  useEffect(() => {
    if (liked !== undefined) {
      setStack(pop(stack)); // Change redux state
      if (liked) {
        dispatch(votePartyMovie({partyId, movieId: curMovieId}));
      } else {
        dispatch(ignore(curMovieId));
      }
      dispatch(removeMovie(curMovieId));
      if (stack.length > 10) dispatch(getMovie(stack[stack.length - 11]));
    }
  }, [liked]);
  useEffect(() => {
    setLiked(undefined);
  }, [stack]);

  // Handle swipe
  const onChange = (like: boolean) => {
    setLiked(like);
  };

  const outOfMovies = stack.length === 0 && !partyMovies.pending;

  if (partyMovies.pending) return <Loading show />;

  if (outOfMovies)
    return (
      <div className="flex flex-col align-center justify-center w-full h-full">
        <FadeOut>
          <p className="text-gray-600 text-center">No more movies to swipe.</p>
        </FadeOut>
      </div>
    );

  const queue = stack.slice(stack.length - 11, stack.length);

  return (
    <div className="flex flex-col space-y-8 w-full h-full">
      <div className="relative h-[70vh]">
        <AnimatePresence>
          {queue.map(m => {
            const movieObj = movie.movies?.[m];
            if (movieObj === undefined) return null;
            const isActive = m === curMovieId;

            return (
              <MovieCard
                key={m}
                movie={movieObj}
                liked={isActive ? liked : undefined}
                onChange={onChange}
                hidden={!isActive}
                active={isActive}
              />
            );
          })}
        </AnimatePresence>
      </div>

      <FadeOut standalone>
        <div className="flex flex-row justify-center">
          <div className="flex flex-row space-x-16">
            <ThumbButton onClick={() => onChange(false)} />
            <ThumbButton onClick={() => onChange(true)} variant="like" />
          </div>
        </div>
      </FadeOut>
    </div>
  );
};

export default Swiping;
