import React from 'react';
import {motion} from 'framer-motion';

import ThreeDotsWave from 'components/animation/threeDotsWave';

interface IProps {
  show?: boolean;
}

const variants = {
  initial: {opacity: 0},
  enter: {opacity: 1, transition: {duration: 0.35}},
  exit: {opacity: 0, transition: {duraiton: 0.25}},
};

const Loading: React.FC<IProps> = props => {
  const {show} = props;

  if (!show) return null;

  return (
    <div className="z-50 fixed inset-0">
      <motion.div className="h-full w-full" variants={variants} initial="initial" exit="exit" animate="enter">
        <div className="h-full w-full bg-gray-900 bg-opacity-50">
          <div className="h-full right-0 left-0 top-4">
            <div className="flex flex-col justify-center items-center max-w-md mx-auto h-full px-4">
              <ThreeDotsWave />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Loading;
