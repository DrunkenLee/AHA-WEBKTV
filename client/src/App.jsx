import { useState } from "react";
import "./index.css";
import "./assets/aha.svg";
import { Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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

function App() {
  const navigate = useNavigate();
  return (
    <motion.div>
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
      </motion.div>
      <motion.div className="body-container" variants={logoVariant}>
        <motion.div>
          <Outlet />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default App;
