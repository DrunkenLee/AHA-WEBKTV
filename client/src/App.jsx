import { useState } from "react";
import "./index.css";
import "./assets/aha.svg";
import { Outlet, useNavigate } from "react-router-dom";
import { AnimatePresence, color, motion, spring } from "framer-motion";
import Modal from "./components/Modal";
import Sidebar from "./components/SidebarComp";
import { Button, ButtonGroup } from "@chakra-ui/react";

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

const AnimatedButton = motion(Button);

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
    <>
      <motion.div className="app-container">
        <Sidebar />
        <h2 style={{ color: "#1A5D1A", fontWeight: "bold" }}>AHA KARAOKE</h2>
        <motion.button
          className="button-login"
          variants={buttonVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          whileHover="hover"
          whileTap="tap"
          onClick={toggleModal}
        >
          Login
        </motion.button>
      </motion.div>
      <motion.div className="outlet-container">
        <Outlet />
      </motion.div>
    </>
  );
}

export default App;
