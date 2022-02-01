import React from 'react';

interface IProps {
  variant?: 'outlined' | 'filled' | 'primary';
  disabled?: boolean;
}

const Button: React.FC<IProps> = props => {
  // Read props
  const {children, variant, disabled} = props;

  // CSS variants
  if (variant === 'outlined')
    return (
      <button
        type="button"
        disabled={disabled}
        className="py-2 px-4 font-medium rounded-full box-border border-2 border-white text-white disabled:opacity-75
          ease-in-out duration-75"
      >
        {children}
      </button>
    );

  if (variant === 'primary')
    return (
      <button
        type="button"
        disabled={disabled}
        className="py-2 px-4 font-medium rounded-full bg-indigo-500 text-white shadow-md disabled:opacity-75 disabled:shadow-none
          ease-in-out duration-75"
      >
        {children}
      </button>
    );

  // Render
  return (
    <button
      type="button"
      disabled={disabled}
      className="py-2 px-4 font-medium rounded-full bg-white text-gray-900 shadow-sm disabled:opacity-75 disabled:shadow-none
        ease-in-out duration-75"
    >
      {children}
    </button>
  );
};

export default Button;
