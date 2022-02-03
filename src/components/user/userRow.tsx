import {motion} from 'framer-motion';
import React from 'react';
import Close from '../icons/close';

interface IProps {
  name: string;
  onDelete?: (name: string) => void;
  deletable?: boolean;
}

const UserRow: React.FC<IProps> = props => {
  const {name, onDelete, deletable} = props;

  return (
    <div className="flex flex-row p-4 space-x-3 items-center">
      <div className="bg-indigo-400 font-bold text-white rounded-full text-center w-8 h-8 flex flex-col justify-center">
        <p>{name[0] || '?'}</p>
      </div>
      <p className="font-medium">{name}</p>
      {deletable ? (
        <motion.div
          whileTap={{scale: 1.3}}
          whileHover={{scale: 1.1}}
          transition={{duration: 0.15}}
          onClick={() => (onDelete ? onDelete(name) : null)}
          className="rounded-full duration-200 hover:bg-indigo-100 absolute right-4 p-2"
        >
          <Close className="w-5 h-5" />
        </motion.div>
      ) : null}
    </div>
  );
};

export default UserRow;
