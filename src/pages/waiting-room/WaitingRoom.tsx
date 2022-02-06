import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {RootState, useAppDispatch} from 'state';
import {deleteParty, getParty} from 'state/party/party';
import {getMembers, deleteMember} from 'state/member/members';
import CascadeParent from 'components/animation/CascadeParent';
import FadeOut from 'components/animation/fadeOut';
import Button from 'components/buttons/button';
import Modal from 'components/input/modal';
import Card from 'components/layout/card';
import Container from 'components/layout/container';
import Header from 'components/text/header';
import UserRow from 'components/user/userRow';
import {AnimatePresence, motion} from 'framer-motion';

const refreshMS = 1000;

const WaitingRoom: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const {partyId} = useParams();

  const dispatch = useAppDispatch();
  const {party: partyState, members: membersState, auth} = useSelector((state: RootState) => state);

  // On page load fetch party and members
  useEffect(() => {
    if (partyId) {
      dispatch(getParty(partyId));
      dispatch(getMembers(partyId));
    }
  }, [partyId]);

  const users = membersState.members;
  const isOwner = partyState.party?.ownerId === auth.id;

  const onDelete = (memberId: string) => {
    if (partyId) dispatch(deleteMember({partyId, memberId})).then(() => dispatch(getMembers(partyId)));
  };

  // Refresh members on a timer
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getMembers(partyId || '')).then(() => setCount(count + 1));
    }, refreshMS);
    return () => clearTimeout(timer);
  });

  // Leave or delete party
  const leaveOrDelete = () => {
    if (partyId === undefined || auth.id === undefined) return;
    if (isOwner) {
      dispatch(deleteParty(partyId)).then(() => navigate('/'));
    } else {
      dispatch(deleteMember({partyId, memberId: auth.id})).then(() => navigate('/'));
    }
  };

  return (
    <Container>
      <CascadeParent>
        <div className="flex flex-col space-y-6">
          <FadeOut>
            <Header
              title="Party Members"
              subtitle={
                <>
                  Join Code: <span className="font-bold">{partyState.party?.joinCode}</span>
                </>
              }
            />
          </FadeOut>

          <FadeOut>
            <Card padded={false}>
              <div className="divide-y flex flex-col w-full">
                <AnimatePresence>
                  {users
                    ? users.map(user => (
                        <UserRow
                          key={user.memberId}
                          id={user.memberId}
                          name={user.name}
                          deletable={isOwner && user.memberId !== auth.id}
                          onDelete={onDelete}
                        />
                      ))
                    : null}
                </AnimatePresence>
              </div>
            </Card>
          </FadeOut>

          <div className="w-full bottom-16 left-0 absolute flex flex-col p-2 space-y-4">
            {isOwner ? (
              <>
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
              </>
            ) : (
              <>
                <FadeOut>
                  <p>Wait for the host to begin.</p>
                </FadeOut>
                <FadeOut>
                  <Button variant="light" onClick={() => setModalOpen(true)}>
                    Leave Party
                  </Button>
                </FadeOut>
              </>
            )}
          </div>
        </div>
      </CascadeParent>
      <Modal
        text={isOwner ? 'Delete party?' : 'Leave party?'}
        show={modalOpen}
        onChange={confirmed => (confirmed ? leaveOrDelete() : setModalOpen(false))}
      />
    </Container>
  );
};

export default WaitingRoom;
