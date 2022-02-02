import React, {useEffect, useState} from 'react';
import {motion, useMotionValue, useDragControls} from 'framer-motion';
import {useWindowWidth} from '@react-hook/window-size';

import MovieInfoCard from './movieInfoCard';

interface IProps {
  name: string;
  onChange: (liked: boolean) => void;
  active?: boolean;
  idx: number;
}

const MovieCard: React.FC<IProps> = props => {
  const {onChange, active, idx, name} = props;

  const dragControls = useDragControls();
  const x = useMotionValue(0);

  const width = useWindowWidth();

  const [rotate, setRotate] = useState<number>(0);
  const [liked, setLiked] = useState<boolean | undefined>();

  // Trigger event handler
  useEffect(() => {
    if (liked !== undefined) onChange(liked);
  }, [liked]);

  // Update rotation
  useEffect(() => {
    const unsubscribeX = x.onChange(pointX => {
      setRotate(Math.trunc((pointX / width) * 20));
    });

    return () => unsubscribeX();
  });

  // Update variants
  const variants = {
    initial: {y: -25, x: 0, opacity: 0},
    enter: {y: 0, x: 0, rotate, opacity: 1, transition: {duration: 0.25}},
    exit: {y: -25, x: liked ? '100vw' : '-100vw', opacity: 0, transition: {duration: 0.25}},
  };

  return (
    <div className="absolute inset-0" style={{zIndex: idx}}>
      <motion.div
        variants={variants}
        initial="initial"
        animate="enter"
        exit="exit"
        drag={active ? 'x' : false}
        style={{x}}
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={{left: 0, right: 0}}
        dragElastic={1}
        whileDrag={{scale: 1.01}}
        onDragEnd={(e, t) => {
          const relativeOffset = (t.point.x - width / 2) / width;
          if (relativeOffset > 0.4) {
            setLiked(true);
          } else if (relativeOffset < -0.4) {
            setLiked(false);
          }
        }}
      >
        <div
          className={`h-[70vh] rounded-xl overflow-hidden duration-500 ease-in-out relative ${
            active ? 'shadow-xl' : 'shadow-none'
          }`}
        >
          <div className="inset-0 absolute z-10" onPointerDown={e => active && dragControls.start(e)}>
            <img className="object-cover h-full w-full" src="/movies/blade-runner.jpg" />
            <div className="absolute bottom-0 inset-x-0 h-24 from-black bg-gradient-to-t" />
          </div>
          <MovieInfoCard />
        </div>
      </motion.div>
    </div>
  );
};

export default MovieCard;
