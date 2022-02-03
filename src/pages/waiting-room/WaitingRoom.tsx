import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import CascadeParent from '../../components/animation/CascadeParent';
import FadeOut from '../../components/animation/fadeOut';
import Button from '../../components/buttons/button';
import Modal from '../../components/input/modal';
import Card from '../../components/layout/card';
import Container from '../../components/layout/container';
import Header from '../../components/text/header';
import UserRow from '../../components/user/userRow';

const WaitingRoom: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const users: string[] = ['Callum', 'Sam', 'Izzy', 'Tony'];

  return (
    <Container>
      <CascadeParent>
        <div className="flex flex-col space-y-6">
          <FadeOut>
            <Header title="Party Members" subtitle="Join Code: FDJ81L" />
          </FadeOut>

          <FadeOut>
            <Card padded={false}>
              <div className="divide-y flex flex-col w-full">
                {users.map(user => (
                  <UserRow key={user} name={user} deletable />
                ))}
              </div>
            </Card>
          </FadeOut>

          <div className="w-full bottom-16 left-0 absolute flex flex-col p-2 space-y-4">
            <FadeOut>
              <Button variant="primary" onClick={() => navigate('./../')}>
                Start Swiping
              </Button>
            </FadeOut>
            <FadeOut>
              <Button variant="light" onClick={() => setModalOpen(true)}>
                Delete Party
              </Button>
            </FadeOut>
          </div>
        </div>
      </CascadeParent>
      <Modal
        text="Leave party?"
        show={modalOpen}
        onChange={confirmed => (confirmed ? navigate('/') : setModalOpen(false))}
      />
    </Container>
  );
};

export default WaitingRoom;
