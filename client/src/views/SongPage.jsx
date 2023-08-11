import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MediaPlayerComp from "../components/MediaPlayerComp";
import Modal from "../components/Modal";
import SliderComp from "../components/SliderComp";
import "../index.css";
import { useNavigate } from "react-router-dom";
import CustomTable from "../components/TableComp";
import { Button, HStack } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import {
  MdPlayCircleOutline,
  MdOutlinePauseCircleFilled,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";

const containerVariant = {
  hidden: {
    opacity: 0,
    y: -10000,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5,
      duration: 1,
    },
  },
  exit: {
    y: -10000,
    transition: {
      duration: 1,
    },
  },
};

const buttonVariant = {
  hover: {
    scale: 1.1,
    textShadow: "0px 0px 8px rgb(255,255,255,255)",
    boxShadow: "0px 0px 8px rgb(255,255,255,255)",
    transition: {
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

const articleVariantRight = {
  hover: {
    scale: 1.2,
    x: -200,
    transition: {
      duration: 2,
    },
  },
};

const articleVariantLeft = {
  hoverleft: {
    scale: 1.2,
    x: 200,
    transition: {
      duration: 2,
    },
  },
};

const SongPage = () => {
  const [homeState, setHomeState] = useState(true);
  const playerRef = useRef(null);
  const navigate = useNavigate();

  const exitAnim = () => {
    setHomeState(false);
    setTimeout(() => {
      navigate("/product");
    }, 1500);
  };

  return (
    <motion.div className="page-container">
      <h3 style={{ marginTop: "1rem" }}>Database Simulator</h3>
      <CustomTable />
    </motion.div>
  );
};

export default SongPage;
