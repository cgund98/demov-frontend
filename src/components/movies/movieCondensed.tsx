import React from 'react';
import {motion} from 'framer-motion';
import {useNavigate} from 'react-router-dom';

import Badge from '../data/badge';
import ArrowLeft from '../icons/arrowLeft';
import ThumbsUp from '../icons/thumbsUp';
import FadeOut from '../animation/fadeOut';

const MovieCondensed: React.FC = props => {
  const navigate = useNavigate();

  return (
    <FadeOut>
      <motion.div
        whileHover={{scale: 1.02}}
        whileTap={{scale: 1.05}}
        className="bg-white rounded-lg w-full shadow-md h-24 overflow-hidden cursor-pointer"
        onClick={() => navigate('/movie/abc')}
      >
        <div className="flex flex-row space-x-2 h-full w-full">
          <div className="basis-1/6 h-full">
            <img className="object-cover h-full w-full " src="/movies/blade-runner.jpg" />
          </div>

          <div className="grow flex flex-col justify-between py-4 px-2 h-full">
            <p className="text-base font-bold line-clamp-1">Blade Runner 2049</p>
            <div className="flex flex-row space-x-2">
              <Badge>Action</Badge>
              <Badge>Drama</Badge>
            </div>
          </div>

          <div className="py-4 px-4 flex flex-col justify-between">
            <div className="flex flex-row items-center space-x-0.5 text-green-500">
              <p>4</p>
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
