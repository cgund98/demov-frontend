import React from 'react';

import Card from '../../components/layout/card';
import Container from '../../components/layout/container';
import Title from '../../components/text/title';
import IconButton from '../../components/buttons/iconButton';
import ArrowLeft from '../../components/icons/arrowLeft';

const NewParty: React.FC = () => {
  return (
    <Container>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <Title>New Party</Title>
          <p className="text-sm text-gray-600">What are you in the mood for?</p>
        </div>

        <Card>
          <div>
            <h3 className="font-bold">Years</h3>
            <p>pee pee poo poo</p>
          </div>
        </Card>
      </div>
      <div className="absolute left-4 bottom-10">
        <IconButton>
          <ArrowLeft className="w-6 h-6" />
        </IconButton>
      </div>
    </Container>
  );
};

export default NewParty;
