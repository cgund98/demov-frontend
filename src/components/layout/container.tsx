import React from 'react';

interface IProps {
  primary?: boolean;
}

const Container: React.FC<IProps> = props => {
  const {children, primary} = props;

  if (primary)
    return (
      <div className="bg-indigo-500 text-white absolute inset-0 py-6 px-10 flex">
        <div className="relative w-full md:container md:mx-auto">{children}</div>
      </div>
    );

  return (
    <div className="bg-gray-50 absolute inset-0 py-6 px-8 flex">
      <div className="relative w-full md:container md:mx-auto">{children}</div>
    </div>
  );
};

export default Container;
