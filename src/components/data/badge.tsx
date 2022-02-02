import React from 'react';

const Badge: React.FC = props => {
  const {children} = props;

  return <div className="rounded-full bg-gray-100 text-gray-500 py-1 px-2 inline text-sm">{children}</div>;
};

export default Badge;
