import React from 'react';
import {motion, Transition} from 'framer-motion';

/*
 * Everything here was copied from: https://github.com/Darth-Knoppix/loading-animation/blob/master/src/ThreeDotsWave.js
 * Tis' a good loading animation.
 */

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const loadingCircleVariants = {
  start: {
    y: '0%',
  },
  end: {
    y: '100%',
  },
};

const loadingCircleTransition: Transition = {
  duration: 0.5,
  repeat: Infinity,
  repeatType: 'reverse',
  ease: 'easeInOut',
};

const ThreeDotsWave: React.FC = () => {
  return (
    <motion.div
      className="w-32 h-24 flex flex-row space-x-2 justify-center items-center"
      variants={loadingContainerVariants}
      initial="start"
      animate="end"
    >
      <motion.span
        className="w-6 h-6 bg-white rounded-full"
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <motion.span
        className="w-6 h-6 bg-white rounded-full"
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <motion.span
        className="w-6 h-6 bg-white rounded-full"
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
    </motion.div>
  );
};

export default ThreeDotsWave;
