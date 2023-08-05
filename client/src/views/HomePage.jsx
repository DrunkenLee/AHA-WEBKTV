import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MediaPlayerComp from "../components/MediaPlayerComp";
import Modal from "../components/Modal";
import SliderComp from "../components/SliderComp";
import "../index.css";
import { useNavigate } from "react-router-dom";

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

const HomePage = () => {
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
    <AnimatePresence>
      {homeState && (
        <motion.div
          className="home-container"
          variants={containerVariant}
          initial="hidden"
          animate="visible"
          exit={{ y: -1000 }}
        >
          <motion.div
            className="slider-container"
            whileHover={{ scale: 1.1, cursor: "pointer" }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.h1>Make An Engaging Karaoke Experience</motion.h1>
            <motion.h4>In Your Very Own Rooms</motion.h4>
          </motion.div>
          <SliderComp />
          <motion.div
            className="article-containerRight"
            variants={articleVariantRight}
            whileHover="hover"
          >
            <motion.p>
              Karaoke, the ultimate form of musical entertainment, promises an
              electrifying experience filled with boundless joy and
              unforgettable moments. Whether you're a seasoned performer or a
              first-timer, stepping into a karaoke lounge sparks an exhilarating
              sense of anticipation. The dimmed lights and vibrant atmosphere
              create a perfect backdrop for shedding inhibitions and unleashing
              the inner diva or rockstar.
            </motion.p>
            <motion.p>
              As the music starts, the stage becomes a canvas, and the
              microphone a magic wand that transforms ordinary individuals into
              extraordinary performers. Friends and strangers alike become a
              harmonious community, cheering each other on, forming an
              unbreakable bond through music.
            </motion.p>
          </motion.div>
          <motion.div
            className="article-containerLeft"
            variants={articleVariantLeft}
            whileHover="hoverleft"
          >
            <motion.p>
              Laughter and cheers echo through the room as the first brave soul
              takes the spotlight. As they serenade the audience, their voice
              carries both passion and vulnerability, creating an emotional
              connection that resonates with everyone present. As the night
              progresses, the energy intensifies, and the room becomes a frenzy
              of applause and encouragement.
            </motion.p>
            <motion.p>
              From soulful ballads that tug at heartstrings to high-energy dance
              anthems that get the whole crowd moving, the song choices span
              genres and eras, catering to diverse tastes. Classic hits from
              legendary artists mix seamlessly with current chart-toppers,
              ensuring there's something for everyone.
            </motion.p>
          </motion.div>
          <motion.button
            className="aha-button1"
            variants={buttonVariant}
            whileHover="hover"
            onClick={exitAnim}
          >
            Learn More
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HomePage;
