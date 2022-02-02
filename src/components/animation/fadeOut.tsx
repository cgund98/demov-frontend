import React from 'react';
import {motion} from 'framer-motion';

const FadeOut: React.FC = props => {
  const {children} = props;

  const transition = {duration: 0.15};

  const variants = {
    initial: {y: -25, opacity: 0},
    enter: {y: 0, opacity: 1, transition},
    exit: {y: -25, opacity: 0, transition: {duration: 0.1}},
  };

  return (
    <motion.div className="w-full" variants={variants}>
      {children}
    </motion.div>
  );
};

export default FadeOut;
