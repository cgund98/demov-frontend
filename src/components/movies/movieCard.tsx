import React, {useEffect, useState} from 'react';
import {motion, useMotionValue, useDragControls, AnimatePresence, useTransform} from 'framer-motion';
import {useWindowWidth} from '@react-hook/window-size';

import MovieInfoCard from './movieInfoCard';

// Swiping threshold
const threshold = 0.4;
const colorThreshold = 0.1;

// Main component
interface IProps {
  onChange: (liked: boolean) => void;
  liked?: boolean;
  active?: boolean;
}

const MovieCard: React.FC<IProps> = props => {
  const {onChange, active, liked} = props;

  const dragControls = useDragControls();
  const x = useMotionValue(0);

  const width = useWindowWidth();

  const greenOpacity = useTransform(x, [width / 10, width], [0, 1]);
  const redOpacity = useTransform(x, [-width, -width / 10], [1, 0]);

  // Update variants
  let exitX = '0';
  if (liked !== undefined) exitX = liked ? '100vw' : '-100vw';

  const variants = {
    initial: {y: 10, x: 0, scale: 0.95, opacity: 0},
    enter: {y: 0, x: 0, scale: 1, opacity: 1, transition: {duration: 0.25}},
    exit: {x: exitX, opacity: 1, transition: {duration: 0.25}},
  };

  return (
    <div className="absolute inset-0">
      <motion.div
        variants={variants}
        style={{x}}
        initial="initial"
        animate="enter"
        exit="exit"
        drag={active ? 'x' : false}
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={{left: 0, right: 0}}
        dragElastic={1}
        whileDrag={{scale: 1.01}}
        onDragEnd={(e, t) => {
          const relativeOffset = (t.point.x - width / 2) / width;
          if (relativeOffset > threshold) {
            onChange(true);
          } else if (relativeOffset < -threshold) {
            onChange(false);
          }
        }}
      >
        <div
          className={`h-[70vh] rounded-xl overflow-hidden duration-500 ease-in-out relative ${
            active ? 'shadow-xl' : 'shadow-none'
          }`}
        >
          <div className="inset-0 absolute z-10" onPointerDown={e => active && dragControls.start(e)}>
            <motion.div className="absolute bottom-0 inset-0 z-10 bg-red-500" style={{opacity: redOpacity}} />
            <motion.div className="absolute bottom-0 inset-0 z-10 bg-green-500" style={{opacity: greenOpacity}} />
            <img className="object-cover h-full w-full" src="/movies/blade-runner.jpg" />
            <div className="absolute bottom-0 inset-x-0 z-0 h-24 from-black bg-gradient-to-t" />
          </div>
          <MovieInfoCard />
        </div>
      </motion.div>
    </div>
  );
};

export default MovieCard;
