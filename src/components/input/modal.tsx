import React from 'react';
import {motion} from 'framer-motion';
import Button from '../buttons/button';

interface IProps {
  show?: boolean;
  onChange: (confirmed: boolean) => void;
  text: string;
}

const variants = {
  initial: {opacity: 0},
  enter: {opacity: 1, transition: {duration: 0.35}},
  exit: {opacity: 0, transition: {duraiton: 0.25}},
};

const Modal: React.FC<IProps> = props => {
  const {show, onChange, text} = props;

  if (!show) return null;

  return (
    <div className="z-50 fixed inset-0">
      <motion.div className="h-full w-full" variants={variants} initial="initial" exit="exit" animate="enter">
        <div className="h-full w-full bg-gray-900 bg-opacity-75 ">
          <div className="h-full right-0 left-0 top-4">
            <div className="flex flex-col justify-center max-w-md mx-auto h-full px-4">
              <div className="rounded-xl bg-white p-4">
                <div className="flex flex-col space-y-4">
                  <p className="font-bold text-lg">{text}</p>
                  <div className="flex flex-row space-x-2">
                    <Button variant="primary" onClick={() => onChange(true)}>
                      Confirm
                    </Button>
                    <Button variant="light" onClick={() => onChange(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;
