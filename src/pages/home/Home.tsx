import React from 'react';
import {useNavigate} from 'react-router-dom';

import Button from '../../components/buttons/button';
import Container from '../../components/layout/container';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container primary>
      <div className="top-1/3 absolute inset-x-3">
        <img className="w-40 mx-auto" src="/logo.svg" placeholder="Logo" />
      </div>
      <div className="w-full bottom-32 left-0 absolute flex flex-col p-4 space-y-4">
        <Button onClick={() => navigate('/new')}>Create Party</Button>
        <Button onClick={() => navigate('/join')} variant="outlined">
          Join Party
        </Button>
      </div>
    </Container>
  );
};

export default Home;
