import {motion} from 'framer-motion';
import React from 'react';

interface IProps {
  variant?: 'outlined' | 'filled' | 'primary' | 'light';
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<IProps> = props => {
  // Read props
  const {children, variant, disabled, onClick} = props;

  // CSS variants
  let contents = (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="py-2 px-4 font-medium rounded-full bg-white text-gray-900 shadow-sm disabled:opacity-75 disabled:shadow-none
    ease-in-out duration-75 w-full"
    >
      {children}
    </button>
  );

  if (variant === 'outlined')
    contents = (
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className="py-2 px-4 font-medium rounded-full box-border border-2 border-white text-white disabled:opacity-75
          ease-in-out duration-75 w-full"
      >
        {children}
      </button>
    );

  if (variant === 'primary')
    contents = (
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className="py-2 px-4 font-medium rounded-full bg-indigo-500 text-white shadow-md disabled:opacity-75 disabled:shadow-none
          ease-in-out duration-75 w-full"
      >
        {children}
      </button>
    );

  if (variant === 'light')
    contents = (
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className="py-2 px-4 font-medium rounded-full bg-gray-100 text-gray-500
        ease-in-out duration-75 w-full"
      >
        {children}
      </button>
    );

  // Render
  return (
    <motion.div whileHover={disabled ? undefined : {scale: 1.05}} whileTap={disabled ? undefined : {scale: 0.95}}>
      {contents}
    </motion.div>
  );
};

export default Button;
