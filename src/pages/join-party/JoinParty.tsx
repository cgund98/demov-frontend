import React from 'react';

import BigInput from '../../components/input/bigInput';
import ArrowLeft from '../../components/icons/arrowLeft';
import Title from '../../components/text/title';
import Button from '../../components/buttons/button';
import IconButton from '../../components/buttons/iconButton';

const JoinParty: React.FC = () => {
  return (
    <div className="bg-indigo-500 absolute inset-0 py-6 px-8 flex">
      <div className="my-3 text-white">
        <Title>Join Party</Title>
      </div>
      <div className="px-12 absolute top-1/2 inset-x-0 flex flex-col space-y-12 -my-12">
        <BigInput placeholder="Join Party" />
        <Button disabled>Join</Button>
      </div>
      <div className="absolute left-8 bottom-8">
        <IconButton>
          <ArrowLeft className="w-6 h-6" />
        </IconButton>
      </div>
    </div>
  );
};

export default JoinParty;
