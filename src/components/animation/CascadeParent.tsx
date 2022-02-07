import React from 'react';
import {motion} from 'framer-motion';

const CascadeParent: React.FC = props => {
  const {children} = props;

  return (
    <motion.div initial="initial" animate="enter" exit="exit" transition={{staggerChildren: 0.075}}>
      {children}
    </motion.div>
  );
};

export default CascadeParent;
