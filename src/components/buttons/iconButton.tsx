import {motion} from 'framer-motion';
import React from 'react';

interface IProps {
  onClick?: () => void;
}

const IconButton: React.FC<IProps> = props => {
  const {children, onClick} = props;

  return (
    <motion.div whileHover={{scale: 1.2}} whileTap={{scale: 0.8}}>
      <button onClick={onClick} type="button" className="rounded-full bg-white shadow-md p-3">
        {children}
      </button>
    </motion.div>
  );
};

export default IconButton;
