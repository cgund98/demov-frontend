import React from 'react';

const Title: React.FC = props => {
  const {children} = props;

  return <h1 className="text-3xl font-bold">{children}</h1>;
};

export default Title;
