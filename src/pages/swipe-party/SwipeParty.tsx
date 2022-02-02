import React, {useEffect, useState} from 'react';

import Container from '../../components/layout/container';
import MovieCard from '../../components/movies/movieCard';
import ThumbButton from '../../components/buttons/thumbButton';
import BottomNav, {swipeMode} from '../../components/nav/bottomNav';

const pop = (array: string[]): string[] =>
  array.filter((_, index) => {
    return index < array.length - 1;
  });

const SwipeParty: React.FC = () => {
  const [mode, setMode] = useState<swipeMode>('swiping');

  const [stack, setStack] = useState<string[]>([]);

  useEffect(() => {
    setStack(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n']);
  }, []);

  const card = (
    <MovieCard
      key={stack[stack.length - 1]}
      onChange={liked => {
        setStack(pop(stack));
      }}
      name={stack[stack.length - 1]}
      idx={1}
      item-value={stack[stack.length - 1]}
      active
    />
  );

  return (
    <Container>
      <div className="flex flex-col space-y-8 w-full h-full">
        <div className="relative h-[70vh]">{card}</div>

        <div className="flex flex-row justify-center">
          <div className="flex flex-row space-x-16">
            <ThumbButton />
            <ThumbButton variant="like" />
          </div>
        </div>

        <div className="flex flex-row justify-center">
          <BottomNav value={mode} onChange={setMode} />
        </div>
      </div>
    </Container>
  );
};

export default SwipeParty;
