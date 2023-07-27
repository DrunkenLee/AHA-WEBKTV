import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MediaPlayerComp from "../components/MediaPlayerComp";
import Modal from "../components/Modal";

const HomePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const playerRef = useRef(null);
  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);

  const handlePlay = () => {
    if (playerRef.current) {
      playerRef.current.getInternalPlayer().play();
      console.log("play");
    }
  };

  const handlePause = () => {
    if (playerRef.current) {
      playerRef.current.getInternalPlayer().pause();
      console.log("pause");
    }
  };

  const handleStop = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(0);
      playerRef.current.getInternalPlayer().pause();
      console.log("stop");
    }
  };

  return (
    <div className="home-container">
      <motion.button
        className="save-button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => (modalOpen ? closeModal() : openModal())}
      >
        Launch Modal
      </motion.button>

      <div className="player-container">
        <MediaPlayerComp
          ref={playerRef}
          url={
            "https://ahakaraokesongs.s3.ap-southeast-1.amazonaws.com/MANTAN+-+Fresly+Nikijuluw+AHA.mp4"
          }
        />
      </div>
      <div className="main-control">
        <motion.button onClick={handlePlay}>PLAY</motion.button>
        <motion.button onClick={handlePause}>PAUSE</motion.button>
        <motion.button onClick={handleStop}>STOP</motion.button>
        <motion.button onClick={""}>SWICH AUDIO</motion.button>
      </div>

      {/*  ----------------- ANIMATE PRESENCE ------------- */}
      <AnimatePresence initial={false} onExitComplete={() => null}>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Modal modalOpen={modalOpen} handleClose={closeModal} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
