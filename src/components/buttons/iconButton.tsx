import {motion} from 'framer-motion';
import React from 'react';

interface IProps {
  onClick?: () => void;
  variant?: 'light' | 'normal';
  transparent?: boolean;
}

const IconButton: React.FC<IProps> = props => {
  const {children, onClick, variant, transparent} = props;

  // Variants
  let content = (
    <button onClick={onClick} type="button" className="rounded-full bg-white shadow-md p-3">
      {children}
    </button>
  );

  if (variant === 'light')
    content = (
      <button
        onClick={onClick}
        type="button"
        className={`rounded-full p-2 duration-500 ${transparent ? 'bg-transparent' : 'bg-gray-200 shadow-sm'}`}
      >
        {children}
      </button>
    );

  return (
    <motion.div className="inline-block" whileHover={{scale: 1.2}} whileTap={{scale: 0.8}}>
      {content}
    </motion.div>
  );
};

export default IconButton;
