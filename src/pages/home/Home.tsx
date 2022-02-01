import React from 'react';

import Button from '../../components/buttons/button';

const Home: React.FC = () => {
  return (
    <div className="bg-indigo-500 absolute inset-0 p-3 flex">
      <div className="top-1/3 absolute inset-x-3">
        <img className="w-40 mx-auto" src="/logo.svg" placeholder="Logo" />
      </div>
      <div className="w-full bottom-32 left-0 absolute flex flex-col p-12 space-y-4">
        <Button>Create new party</Button>
        <Button variant="outlined">Join existing party</Button>
      </div>
    </div>
  );
};

export default Home;
