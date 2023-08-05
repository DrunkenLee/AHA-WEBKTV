import { useState } from "react";
import "./index.css";
import "./assets/aha.svg";
import { Outlet, useNavigate } from "react-router-dom";
import { AnimatePresence, motion, spring } from "framer-motion";
import Modal from "./components/Modal";

const containerVariant = {
  hidden: {
    y: "-100vh",
  },
  visible: {
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      duration: 1,
      when: "beforeChildren",
      staggerChildren: 2,
    },
  },
};

const logoVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const buttonVariant = {
  hover: {
    scale: 1.1,
  },
  tap: {
    scale: 0.9,
  },
  hidden: {
    x: 1000,
  },
  visible: {
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    x: 1000,
  },
};

function App() {
  const [loginState, setLoginState] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const joinUs = () => {
    setLoginState(loginState ? false : true);
  };

  const toggleModal = () => {
    setShowModal(showModal ? false : true);
  };
  const onClose = () => {
    setShowModal(false);
  };
  return (
    <motion.div className="main-page">
      <motion.div
        className="navbar-container"
        variants={containerVariant}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="navbar-items">
          <motion.img
            src="https://ahakaraokesongs.s3.ap-southeast-1.amazonaws.com/aha.svg"
            alt=""
            whileHover={{ scale: 1.1, cursor: "pointer" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/")}
            variants={logoVariant}
          />
        </motion.div>
        <motion.h1 className="h1-title" style={{ fontFamily: "Quicksand" }}>
          AHA WEB-KTV
        </motion.h1>
        <motion.div className="button-container-navbar">
          <AnimatePresence>
            {!loginState && (
              <motion.button
                className="aha-button2"
                variants={buttonVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover="hover"
                whileTap="tap"
                onClick={joinUs}
              >
                Join Us
              </motion.button>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {loginState && (
              <motion.div className="log-reg">
                <motion.button
                  className="aha-button2"
                  variants={buttonVariant}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={toggleModal}
                >
                  Login
                </motion.button>
                <motion.button
                  className="aha-button2"
                  variants={buttonVariant}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap="tap"
                >
                  Register
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      <motion.div className="body-container" variants={logoVariant}>
        <motion.div>
          <Outlet />
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {showModal && <Modal handleClose={onClose} />}
      </AnimatePresence>
    </motion.div>
  );
}

export default App;
