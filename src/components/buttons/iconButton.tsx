import React from 'react';

const IconButton: React.FC = props => {
  const {children} = props;

  return (
    <button type="button" className="rounded-full bg-white shadow-md p-3">
      {children}
    </button>
  );
};

export default IconButton;
