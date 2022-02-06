import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AnimatePresence} from 'framer-motion';
import Slider from 'react-input-slider';
import {useSelector} from 'react-redux';
import {unwrapResult} from '@reduxjs/toolkit';

import Card from 'components/layout/card';
import Container from 'components/layout/container';
import IconButton from 'components/buttons/iconButton';
import ArrowLeft from 'components/icons/arrowLeft';
import ButtonGroup from 'components/input/buttonGroup';
import Dropdown from 'components/input/dropdown';
import TextInput from 'components/input/textInput';
import Button from 'components/buttons/button';
import Header from 'components/text/header';
import FadeOut from 'components/animation/fadeOut';
import CascadeParent from 'components/animation/CascadeParent';
import {GENRES} from 'utils/config';
import Badge from 'components/data/badge';

import {RootState, useAppDispatch} from 'state';
import {login} from 'state/auth/auth';
import {createParty, reset as resetParty} from 'state/party/party';
import {reset as resetMembers} from 'state/member/members';
import Loading from 'components/layout/loading';

const capitalize = (s: string) => s.replace(/^\w/, c => c.toUpperCase());

// Custom components
const InputTitle: React.FC = props => <h3 className="font-bold">{props.children}</h3>;

const InputGroup: React.FC = props => {
  const {children} = props;

  return <div className="flex flex-col space-y-2">{children}</div>;
};

const yearsOptions = [
  {label: '1980s', value: '1980'},
  {label: '1990s', value: '1990'},
  {label: '2000s', value: '2000'},
  {label: '2010s', value: '2010'},
];

const ratingsOptions = [
  {label: '6+', value: '6'},
  {label: '7+', value: '7'},
  {label: '8+', value: '8'},
  {label: '9+', value: '9'},
];

// Main page
const NewParty: React.FC = () => {
  const navigate = useNavigate();

  const [maxSwipes, setMaxSwipes] = useState<number>(50);
  const [genres, setGenres] = useState<string[]>([]);
  const [minYear, setMinYear] = useState<string>('');
  const [maxYear, setMaxYear] = useState<string>('');
  const [minRating, setMinRating] = useState<string>('');
  const [name, setName] = useState<string>('');

  const dispatch = useAppDispatch();
  const {pending: authPending} = useSelector((state: RootState) => state.auth);
  const {pending: partyPending} = useSelector((state: RootState) => state.party);

  const genresSet = new Set(genres);
  const availGenres = GENRES.filter(genre => !genresSet.has(genre));

  // Handle a change in year selection
  const handleYear = (year: string) => {
    let newMin = minYear;
    let newMax = maxYear;

    if (newMin === '' && newMax === '') {
      newMin = year;
      newMax = year;
    } else {
      if (year === minYear) newMin = '';
      if (year === maxYear) newMax = '';
    }

    if (year !== minYear && year !== maxYear) {
      if (year < minYear) newMin = year;
      else newMax = year;
    }

    // Find new minimum value
    if (newMin === '' && newMax !== '')
      yearsOptions.every(opt => {
        if (opt.value > year && opt.value <= newMax) {
          newMin = opt.value;
          return false;
        }
        return true;
      });

    // Find new maximum value
    if (newMin !== '' && newMax === '')
      yearsOptions
        .slice()
        .reverse()
        .every(opt => {
          if (opt.value < year && opt.value >= newMin) {
            newMax = opt.value;
            return false;
          }
          return true;
        });

    setMinYear(newMin);
    setMaxYear(newMax);
  };

  const valid = minYear !== '' && maxYear !== '' && minRating !== '' && genres.length > 0 && name !== '';

  // Submit form
  const submit = () => {
    // Create request body
    const body = {
      minYear: parseInt(minYear, 10),
      maxYear: parseInt(maxYear, 10) + 9,
      genres,
      minRating: parseInt(minRating, 10),
      maxSwipes,
    };

    // Reset state in preparation
    dispatch(resetParty());
    dispatch(resetMembers());

    // Dispatch actions
    dispatch(login({name}))
      .then(() => {
        dispatch(
          createParty({
            body,
          }),
        )
          .then(unwrapResult)
          .then(payload => {
            navigate(`/party/${payload.data.partyId}/wait`);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  return (
    <Container>
      <CascadeParent>
        <div className="flex flex-col space-y-6 pb-12">
          <FadeOut>
            <Header title="New Party" subtitle="What are you in the mood for?" />
          </FadeOut>

          <FadeOut>
            <Card>
              <div className="flex flex-col space-y-4">
                <InputGroup>
                  <InputTitle>Years</InputTitle>
                  <ButtonGroup
                    items={yearsOptions.map(opt => ({
                      ...opt,
                      checked: opt.value >= minYear && opt.value <= maxYear,
                    }))}
                    onChange={handleYear}
                  />
                </InputGroup>
                <InputGroup>
                  <InputTitle>IMDb Rating</InputTitle>
                  <ButtonGroup
                    items={ratingsOptions.map(opt => ({
                      ...opt,
                      checked: minRating !== '' && opt.value >= minRating,
                    }))}
                    onChange={rating => setMinRating(rating)}
                  />
                </InputGroup>
                <InputGroup>
                  <InputTitle>Genres</InputTitle>
                  <Dropdown
                    label="Pick up to 3"
                    options={availGenres.map(genre => ({
                      label: capitalize(genre),
                      value: genre,
                    }))}
                    disabled={!(genres.length < 3)}
                    onClick={genre => setGenres([...genres, genre])}
                  />
                  <div className="flex flex-row space-x-1">
                    <AnimatePresence>
                      {genres.map(genre => (
                        <Badge primary onClose={() => setGenres(genres.filter(g => g !== genre))} key={genre}>
                          {capitalize(genre)}
                        </Badge>
                      ))}
                    </AnimatePresence>
                  </div>
                </InputGroup>
                <InputGroup>
                  <InputTitle>Maximum Swipes</InputTitle>
                  <div className="flex flex-row items-center space-x-4">
                    <p className="w-4">{maxSwipes}</p>
                    <Slider
                      styles={{track: {flexGrow: 1}}}
                      axis="x"
                      xmin={25}
                      xmax={150}
                      xstep={5}
                      x={maxSwipes}
                      onChange={value => setMaxSwipes(value.x)}
                    />
                  </div>
                </InputGroup>
              </div>
            </Card>
          </FadeOut>

          <FadeOut>
            <Card>
              <InputGroup>
                <InputTitle>Your Name</InputTitle>
                <TextInput placeholder="Name" value={name} onChange={el => setName(el.target.value)} />
              </InputGroup>
            </Card>
          </FadeOut>

          <FadeOut>
            <Button disabled={!valid} variant="primary" onClick={() => submit()}>
              Create
            </Button>
          </FadeOut>
        </div>

        <div className="fixed left-4 bottom-4">
          <FadeOut>
            <IconButton onClick={() => navigate('/')}>
              <ArrowLeft className="w-6 h-6" />
            </IconButton>
          </FadeOut>
        </div>

        <Loading show={authPending || partyPending} />
      </CascadeParent>
    </Container>
  );
};

export default NewParty;
