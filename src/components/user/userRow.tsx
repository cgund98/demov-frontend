import React from 'react';
import {motion} from 'framer-motion';

import Close from '../icons/close';

interface IProps {
  name: string;
  id: string;
  onDelete?: (id: string) => void;
  deletable?: boolean;
}

const variants = {
  initial: {scaleY: 0},
  enter: {scaleY: '100%', transition: {duration: 0.5, type: 'spring'}},
  exit: {scaleY: 0, transition: {duration: 0.25, type: 'spring'}},
};

const UserRow: React.FC<IProps> = props => {
  const {id, name, onDelete, deletable} = props;

  return (
    <motion.div
      variants={variants}
      style={{originY: 0}}
      initial="initial"
      animate="enter"
      exit="exit"
      layout
      className="flex flex-row p-4 space-x-3 items-center"
    >
      <div className="bg-indigo-400 font-bold text-white rounded-full text-center w-8 h-8 flex flex-col justify-center">
        <p>{name[0] || '?'}</p>
      </div>
      <p className="font-medium">{name}</p>
      {deletable ? (
        <motion.div
          whileTap={{scale: 2}}
          whileHover={{scale: 1.1}}
          transition={{duration: 0.35}}
          onClick={() => (onDelete ? onDelete(id) : null)}
          className="rounded-full duration-200 hover:bg-indigo-100 absolute right-4 p-2"
        >
          <Close className="w-5 h-5" />
        </motion.div>
      ) : null}
    </motion.div>
  );
};

export default UserRow;
