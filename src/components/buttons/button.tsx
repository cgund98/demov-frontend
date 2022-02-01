import React from 'react';

interface IProps {
  variant?: 'outlined' | 'filled' | 'primary';
}

const Button: React.FC<IProps> = props => {
  // Read props
  const {children, variant} = props;

  // CSS variants
  if (variant === 'outlined')
    return (
      <button type="button" className="py-2 px-4 font-medium rounded-full box-border border-2 border-white text-white">
        {children}
      </button>
    );

  // Render
  return (
    <button type="button" className="py-2 px-4 font-medium rounded-full bg-white text-gray-900 shadow-sm">
      {children}
    </button>
  );
};

export default Button;
