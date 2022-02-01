import React from 'react';

import Card from '../../components/layout/card';
import Container from '../../components/layout/container';
import Title from '../../components/text/title';
import IconButton from '../../components/buttons/iconButton';
import ArrowLeft from '../../components/icons/arrowLeft';
import ButtonGroup from '../../components/input/buttonGroup';
import Dropdown from '../../components/input/dropdown';
import TextInput from '../../components/input/textInput';
import Button from '../../components/buttons/button';

// Custom components
const InputTitle: React.FC = props => <h3 className="font-bold">{props.children}</h3>;

const InputGroup: React.FC = props => {
  const {children} = props;

  return <div className="flex flex-col space-y-2">{children}</div>;
};

// Main page
const NewParty: React.FC = () => {
  const genres: string[] = [
    'Drama',
    'Action',
    'Comedy',
    'Adventure',
    'Thriller',
    'Crime',
    'Sci-Fi',
    'Romance',
    'Fantasy',
    'Mystery',
    'Horror',
  ];

  return (
    <Container>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <Title>New Party</Title>
          <p className="text-sm text-gray-600">What are you in the mood for?</p>
        </div>

        <Card>
          <div className="flex flex-col space-y-4">
            <InputGroup>
              <InputTitle>Years</InputTitle>
              <ButtonGroup
                items={[
                  {label: '1980s', value: '1980s'},
                  {label: '1990s', value: '1990s'},
                  {label: '2000s', value: '2000s'},
                  {label: '2010s', value: '2010s'},
                ]}
              />
            </InputGroup>

            <InputGroup>
              <InputTitle>IMDb Rating</InputTitle>
              <ButtonGroup
                items={[
                  {label: '6+', value: '6+'},
                  {label: '7+', value: '7+'},
                  {label: '8+', value: '8+'},
                  {label: '9+', value: '2010s'},
                ]}
              />
            </InputGroup>

            <InputGroup>
              <InputTitle>Genres</InputTitle>
              <Dropdown
                label="Pick up to 3"
                options={genres.map(genre => ({label: genre, value: genre.toLowerCase()}))}
              />
            </InputGroup>
          </div>
        </Card>

        <Card>
          <InputGroup>
            <InputTitle>Your Name</InputTitle>
            <TextInput placeholder="Name" />
          </InputGroup>
        </Card>

        <Button variant="primary">Create</Button>
      </div>

      <div className="absolute left-4 bottom-4">
        <IconButton>
          <ArrowLeft className="w-6 h-6" />
        </IconButton>
      </div>
    </Container>
  );
};

export default NewParty;
