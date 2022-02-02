import React from 'react';
import {motion} from 'framer-motion';

import MovieIcon from '../icons/movie';
import PresentIcon from '../icons/present';

export type swipeMode = 'swiping' | 'results';

interface IProps {
  value: swipeMode;
  onChange: (name: swipeMode) => void;
}

const BottomNav: React.FC<IProps> = props => {
  const {value, onChange} = props;

  return (
    <div className="rounded-full flex flex-row space-x-10 px-5 py-2 bg-white shadow text-grey-700">
      <motion.div
        className="p-1 cursor-pointer"
        onClick={() => onChange('swiping')}
        whileHover={{scale: 1.2}}
        whileTap={{scale: 0.8}}
      >
        <MovieIcon className={`w-5 h-5 ${value === 'swiping' ? 'text-indigo-500' : ''}`} />
      </motion.div>
      <motion.div
        className="p-1 cursor-pointer"
        onClick={() => onChange('results')}
        whileHover={{scale: 1.2}}
        whileTap={{scale: 0.8}}
      >
        <PresentIcon className={`w-5 h-5 ${value === 'results' ? 'text-indigo-500' : ''}`} />
      </motion.div>
    </div>
  );
};

export default BottomNav;
