import React from 'react';
import {motion} from 'framer-motion';
import {useNavigate} from 'react-router-dom';

import {Movie} from 'api/movies/movie';
import {API_PREFIX} from 'utils/config';

import Badge from '../data/badge';
import ArrowLeft from '../icons/arrowLeft';
import ThumbsUp from '../icons/thumbsUp';
import FadeOut from '../animation/fadeOut';

interface IProps {
  movie: Movie;
  score: number;
}

const MovieCondensed: React.FC<IProps> = ({movie, score}) => {
  const navigate = useNavigate();

  const genres = movie.genres.split(', ');

  return (
    <FadeOut>
      <motion.div
        whileHover={{scale: 1.02}}
        whileTap={{scale: 1.05}}
        layout
        className="bg-white rounded-lg w-full shadow-md h-24 overflow-hidden cursor-pointer"
        onClick={() => navigate(`/movie/${movie.movieId}`)}
      >
        <div className="flex flex-row space-x-2 h-full w-full">
          <div className="basis-1/6 h-full">
            <img className="object-cover h-full w-full " src={`${API_PREFIX}/${movie.imageUrlLR}`} />
          </div>

          <div className="grow flex flex-col justify-between py-4 px-2 h-full">
            <p className="text-base font-bold line-clamp-1">{movie.title}</p>
            <div className="flex flex-row space-x-2">
              {genres.map(genre => (
                <Badge key={genre}>{genre}</Badge>
              ))}
            </div>
          </div>

          <div className="py-4 px-4 flex flex-col justify-between">
            <div className="flex flex-row items-center space-x-0.5 text-green-500">
              <p>{score}</p>
              <ThumbsUp className="h-3 w-3 -mt-px" />
            </div>

            <div>
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </div>
          </div>
        </div>
      </motion.div>
    </FadeOut>
  );
};

export default MovieCondensed;
