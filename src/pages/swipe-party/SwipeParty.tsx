import React, {useEffect, useState} from 'react';
import {AnimatePresence} from 'framer-motion';

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
  const [liked, setLiked] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    setStack(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n']);
  }, []);

  useEffect(() => {
    if (liked !== undefined) setStack(pop(stack));
  }, [liked]);
  useEffect(() => {
    setLiked(undefined);
  }, [stack]);

  const onChange = (like: boolean) => setLiked(like);

  const curElement = stack[stack.length - 1];

  return (
    <Container>
      <div className="flex flex-col space-y-8 w-full h-full">
        <div className="relative h-[70vh]">
          <AnimatePresence exitBeforeEnter>
            <MovieCard key={curElement} liked={liked} onChange={onChange} active />
          </AnimatePresence>
        </div>

        <div className="flex flex-row justify-center">
          <div className="flex flex-row space-x-16">
            <ThumbButton onClick={() => onChange(false)} />
            <ThumbButton onClick={() => onChange(true)} variant="like" />
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
