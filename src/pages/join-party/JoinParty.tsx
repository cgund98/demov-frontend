import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {unwrapResult} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';

import BigInput from 'components/input/bigInput';
import ArrowLeft from 'components/icons/arrowLeft';
import Title from 'components/text/title';
import Button from 'components/buttons/button';
import IconButton from 'components/buttons/iconButton';
import Container from 'components/layout/container';
import CascadeParent from 'components/animation/CascadeParent';
import FadeOut from 'components/animation/fadeOut';

import {RootState, useAppDispatch} from 'state';
import {joinParty, reset as resetParty} from 'state/party/party';
import {reset as resetMembers} from 'state/member/members';
import {login} from 'state/auth/auth';
import Loading from 'components/layout/loading';

const JoinParty: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const {pending: authPending} = useSelector((state: RootState) => state.auth);
  const {pending: partyPending} = useSelector((state: RootState) => state.party);

  const [hasName, setHasName] = useState(false);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  const submit = () => {
    dispatch(resetParty());
    dispatch(resetMembers());
    dispatch(login({name})).then(() => {
      dispatch(joinParty(code.toUpperCase()))
        .then(unwrapResult)
        .then(response => navigate(`/party/${response.data.partyId}/wait`))
        .catch(() => null);
    });
  };

  return (
    <Container primary>
      <div className="my-3 w-full text-white">
        <Title>Join Party</Title>
      </div>
      {!hasName ? (
        <div className="px-8 absolute top-1/2 inset-x-0 -my-12">
          <CascadeParent>
            <div className="flex flex-col space-y-6">
              <FadeOut>
                <BigInput value={name} placeholder="Your Name" onChange={event => setName(event.target.value)} />
              </FadeOut>
              <FadeOut>
                <Button disabled={name === ''} onClick={() => setHasName(true)}>
                  Next
                </Button>
              </FadeOut>
            </div>
          </CascadeParent>
        </div>
      ) : (
        <div className="px-8 absolute top-1/2 inset-x-0 -my-12">
          <CascadeParent>
            <div className="flex flex-col space-y-6">
              <FadeOut>
                <BigInput
                  uppercase
                  value={code}
                  placeholder="Join Code"
                  onChange={event => setCode(event.target.value)}
                />
              </FadeOut>
              <FadeOut>
                <Button disabled={code === ''} onClick={submit}>
                  Join
                </Button>
              </FadeOut>
            </div>
          </CascadeParent>
        </div>
      )}

      <div className="absolute left-4 bottom-10">
        <IconButton onClick={() => (hasName ? setHasName(false) : navigate('/'))}>
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </IconButton>
      </div>
      <Loading show={authPending || partyPending} />
    </Container>
  );
};

export default JoinParty;
