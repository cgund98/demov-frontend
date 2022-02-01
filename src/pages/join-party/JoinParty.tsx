import React from 'react';

import BigInput from '../../components/input/bigInput';
import ArrowLeft from '../../components/icons/arrowLeft';
import Title from '../../components/text/title';
import Button from '../../components/buttons/button';
import IconButton from '../../components/buttons/iconButton';
import Container from '../../components/layout/container';

const JoinParty: React.FC = () => {
  return (
    <Container primary>
      <div className="my-3 w-full text-white">
        <Title>Join Party</Title>
      </div>
      <div className="px-8 absolute top-1/2 inset-x-0 flex flex-col space-y-12 -my-12">
        <BigInput placeholder="Join Party" />
        <Button disabled>Join</Button>
      </div>
      <div className="absolute left-4 bottom-10">
        <IconButton>
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </IconButton>
      </div>
    </Container>
  );
};

export default JoinParty;
