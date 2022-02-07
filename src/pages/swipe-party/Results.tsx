import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {AnimatePresence} from 'framer-motion';
import {useSelector} from 'react-redux';

import CascadeParent from 'components/animation/CascadeParent';
import FadeOut from 'components/animation/fadeOut';
import MovieCondensed from 'components/movies/movieCondensed';
import Header from 'components/text/header';
import IconButton from 'components/buttons/iconButton';
import Exit from 'components/icons/exit';
import Modal from 'components/input/modal';

import {RootState, useAppDispatch} from 'state';
import {getPartyMovies} from 'state/party-movie/partyMovies';
import {unwrapResult} from '@reduxjs/toolkit';
import {getMovie} from 'state/movie/movie';

const refreshMS = 10 * 1000;

const Results: React.FC = () => {
  const {partyId} = useParams();
  if (partyId === undefined) return null;

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const {partyMovies, movie} = useSelector((state: RootState) => state);

  const refresh = () =>
    dispatch(getPartyMovies(partyId))
      .then(unwrapResult)
      .then(({data}) =>
        data.forEach(m => {
          if (!movie.movies?.[m.movieId]) dispatch(getMovie(m.movieId));
        }),
      )
      .catch(() => null);

  useEffect(() => {
    refresh();
  }, [partyId]);

  // Refresh members on a timer
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      refresh();
      setCount(count + 1);
    }, refreshMS);
    return () => clearTimeout(timer);
  });

  const matchedMovies = partyMovies.movies?.filter(m => m.score > 0);

  return (
    <CascadeParent>
      <div className="flex flex-col space-y-6 pb-20">
        <FadeOut>
          <Header title="Results" />
        </FadeOut>

        {matchedMovies?.length ? (
          <FadeOut>
            <AnimatePresence exitBeforeEnter>
              <CascadeParent>
                <div className="flow flow-col space-y-4">
                  {matchedMovies.map(m => {
                    const movObj = movie.movies?.[m.movieId];
                    if (movObj === undefined) return null;
                    return <MovieCondensed key={m.movieId} movie={movObj} score={m.score} />;
                  })}
                </div>
              </CascadeParent>
            </AnimatePresence>
          </FadeOut>
        ) : null}
      </div>

      {!matchedMovies?.length ? (
        <div className="fixed flex flex-col align-center justify-center w-full h-full top-0 left-0">
          <FadeOut>
            <p className="text-gray-600 text-center">No matches yet :(</p>
          </FadeOut>
        </div>
      ) : null}

      <div className="absolute top-0 right-0">
        <FadeOut standalone>
          <IconButton onClick={() => setModalOpen(true)} transparent variant="light">
            <Exit className="w-5 h-5 text-gray-500" />
          </IconButton>
        </FadeOut>
      </div>

      <Modal
        text="Leave party?"
        show={modalOpen}
        onChange={confirmed => (confirmed ? navigate('/') : setModalOpen(false))}
      />

      <div className="fixed z-0 inset-x-0 -bottom-2 from-gray-50 via-gray-50 to-transparent bg-gradient-to-t h-24" />
    </CascadeParent>
  );
};

export default Results;
