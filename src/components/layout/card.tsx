import React from 'react';

const Card: React.FC = props => {
  const {children} = props;

  return <div className="rounded-lg p-4 bg-white shadow-md">{children}</div>;
};

export default Card;
