import React from 'react';
import {motion} from 'framer-motion';

interface IProps {
  primary?: boolean;
}

const Container: React.FC<IProps> = props => {
  const {children, primary} = props;

  const transition = {duration: 0.125};

  if (primary)
    return (
      <motion.div
        variants={{
          initial: {opacity: 0},
          enter: {opacity: 1, transition},
          exit: {opacity: 0, transition},
        }}
        animate="enter"
        initial="initial"
        exit="exit"
        className="bg-indigo-500 text-white absolute inset-0 py-2 px-3 flex"
      >
        <div className="relative w-full md:mx-auto max-w-md">{children}</div>
      </motion.div>
    );

  return (
    <div className="bg-gray-50 w-full h-full py-2 px-3 flex flex-col">
      <div className="relative w-full h-full md:mx-auto max-w-md">{children}</div>
    </div>
  );
};

export default Container;
