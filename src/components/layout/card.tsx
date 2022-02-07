import React from 'react';

interface IProps {
  padded?: boolean;
}

const Card: React.FC<IProps> = props => {
  const {children, padded} = props;

  if (padded === false) return <div className="rounded-lg bg-white shadow-md">{children}</div>;

  return <div className="rounded-lg p-4 bg-white shadow-md">{children}</div>;
};

export default Card;
