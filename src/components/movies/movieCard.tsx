import React, {useState} from 'react';
import {motion} from 'framer-motion';

import MovieInfoCard from './movieInfoCard';

interface IProps {
  name: string;
}

const transition = {duration: 0.5};
const variants = {
  closed: {x: '100%', transition},
  open: {height: '50%', transition},
};

const MovieCard: React.FC<IProps> = props => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="h-3/4 rounded-xl shadow-xl overflow-hidden relative">
      <div className="inset-0 absolute">
        <img className="object-cover h-full" src="/movies/blade-runner.jpg" />
        <div className="absolute bottom-0 inset-x-0 h-24 from-black bg-gradient-to-t" />
      </div>
      <div className="h-full px-4 relative">
        <motion.div
          // variants={variants}
          // animate={open ? 'open' : 'closed'}
          className="w-full h-full -mb-20"
        ></motion.div>
        <MovieInfoCard open={open} toggle={() => setOpen(!open)} />
      </div>
    </div>
  );
};

export default MovieCard;
