import React from 'react';
import {motion} from 'framer-motion';

import Close from 'components/icons/close';

interface IProps {
  primary?: boolean;
  onClose?: () => void;
}

const variants = {
  initial: {opacity: 0},
  enter: {opacity: 1, transition: {duration: 0.45, type: 'spring'}},
  exit: {opacity: 0, transition: {duration: 0.25}},
};

const Badge: React.FC<IProps> = props => {
  const {children, primary, onClose} = props;

  if (primary)
    return (
      <motion.div
        variants={variants}
        initial="initial"
        exit="exit"
        animate="enter"
        className="rounded-full bg-indigo-500 text-gray-100 py-1 px-2 flex flex-row items-center space-x-1 text-sm overflow-hidden"
      >
        <p>{children} </p>
        <motion.div
          className="bg-indigo-300 text-indigo-500 rounded-full cursor-pointer"
          onClick={() => (onClose ? onClose() : null)}
          layout
        >
          <Close className="w-3 h-3 p-0.5 box-content " />
        </motion.div>
      </motion.div>
    );

  return <div className="rounded-full bg-gray-100 text-gray-500 py-1 px-2 text-xs inline">{children}</div>;
};

export default Badge;
