import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AnimatePresence} from 'framer-motion';

import CascadeParent from '../../components/animation/CascadeParent';
import FadeOut from '../../components/animation/fadeOut';
import MovieCondensed from '../../components/movies/movieCondensed';
import Header from '../../components/text/header';
import IconButton from '../../components/buttons/iconButton';
import Exit from '../../components/icons/exit';
import Modal from '../../components/input/modal';

const Results: React.FC = props => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  return (
    <CascadeParent>
      <div className="flex flex-col space-y-6 pb-20">
        <FadeOut>
          <Header title="Results" />
        </FadeOut>
        <FadeOut>
          <AnimatePresence exitBeforeEnter>
            <CascadeParent>
              <div className="flow flow-col space-y-4">
                <MovieCondensed />
                <MovieCondensed />
                <MovieCondensed />
                <MovieCondensed />
                <MovieCondensed />
                <MovieCondensed />
                <MovieCondensed />
                <MovieCondensed />
              </div>
            </CascadeParent>
          </AnimatePresence>
        </FadeOut>
      </div>

      <div className="absolute top-0 right-0">
        <FadeOut standalone>
          <IconButton onClick={() => setModalOpen(true)} transparent variant="light">
            <Exit className="w-5 h-5 text-gray-500" />
          </IconButton>
        </FadeOut>
      </div>

      <Modal
        text="Leave party?"
        show={modalOpen}
        onChange={confirmed => (confirmed ? navigate('/') : setModalOpen(false))}
      />

      <div className="fixed z-0 inset-x-0 -bottom-2 from-gray-50 via-gray-50 to-transparent bg-gradient-to-t h-24" />
    </CascadeParent>
  );
};

export default Results;
