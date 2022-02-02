import React, {useState} from 'react';
import {motion} from 'framer-motion';

import Star from '../icons/star';
import Calendar from '../icons/calendar';
import ChevronDown from '../icons/chevronDown';
import IconButton from '../buttons/iconButton';
import InfoSection from './infoSection';
import Badge from '../data/badge';

interface IProps {
  name?: string;
  open: boolean;
  toggle: () => void;
}

// Divider (1px tall horizontal line)
interface IDivider {
  transparent?: boolean;
}
const Divider: React.FC<IDivider> = props => (
  <div className={`h-px w-full flex  duration-500 ${props.transparent ? 'bg-transparent' : 'bg-gray-200'}`}>
    {props.children}
  </div>
);

// Animation
const wrapperVariants = {
  open: {y: '-16rem', transition: {duration: 0.5}},
  closed: {y: 0, transition: {duration: 0.5}},
};
const infoVariants = {
  open: {height: 'auto', transition: {duration: 0.25}},
  closed: {height: 0, transition: {duration: 0.75}},
};
const buttonVariants = {
  open: {y: 0, rotate: 0, transition: {duration: 0.75}},
  closed: {y: -8, rotate: 180 + 360 * 2, transition: {duration: 0.75}},
};

// Main Movie card
const MovieInfoCard: React.FC<IProps> = props => {
  const {open, toggle} = props;

  const animate = open ? 'open' : 'closed';

  const genres = ['Action', 'Thriller'];

  return (
    <motion.div
      variants={wrapperVariants}
      animate={animate}
      className={`z-20 bg-white rounded-xl w-full p-3 shadow-md max-h-96 pb-16 ${open ? 'overflow-y-scroll' : ''}`}
    >
      <div className="flex flex-col space-y-0.5">
        <div className="flex flex-row justify-between">
          <p className="text-lg font-bold line-clamp-1">Blade Runner 2049: A second blade runner movie</p>
          <div className="flex flex-row items-center space-x-0.5">
            <p>7.2</p>
            <Star className="h-3.5 w-3.5 text-yellow-500 -mt-px" />
          </div>
        </div>

        <div className="flex flex-row items-center space-x-1 text-gray-600">
          <Calendar className="h-3.5 w-3.5" />
          <p>2017</p>
        </div>
      </div>

      <div className="relative py-2 ">
        <Divider transparent={!open}>
          <div className="inline-block left-1/2 absolute -translate-x-1/2 -translate-y-1/2 z-20 ">
            <IconButton transparent={!open} onClick={toggle} variant="light">
              <motion.div variants={buttonVariants} animate={animate}>
                <ChevronDown className="w-5 h-5 text-gray-700" />
              </motion.div>
            </IconButton>
          </div>
        </Divider>
      </div>

      <motion.div variants={infoVariants} animate={animate} className="flex flex-col space-y-3 overflow-hidden mt-2">
        <div className="flex flex-col space-y-2 py-2">
          <p className="gray-700 text-sm">
            Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick
            Deckard, who's been missing for thirty years.
          </p>
          <div className="flex flex-row space-x-2">
            {genres.map(genre => (
              <Badge>{genre}</Badge>
            ))}
          </div>
        </div>

        <Divider />

        <InfoSection title="Director" contents="Denis Villeneuve" />

        <InfoSection title="Actors" contents="Denis Villeneuve" />

        <InfoSection title="Title" contents="Blade Runner 2049: A second blade runner movie" />
      </motion.div>
    </motion.div>
  );
};

export default MovieInfoCard;
