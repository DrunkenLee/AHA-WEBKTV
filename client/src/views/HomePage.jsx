import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoJS from "../components/VideoJs";
import trialvideo from "../video/Santa Fe - Bon Jovi.mp4";
import { motion } from "framer-motion";
import { VStack } from "@chakra-ui/react";

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

  const videoJsOptions = {
    controls: true,
    sources: [
      {
        src: trialvideo,
        type: "video/mp4",
      },
    ],
  };

  return (
    <div className="home-container">
      <h2>This Week Picks</h2>
      <motion.div className="right-container">
        <VideoJS options={videoJsOptions} />
        <h3 style={{ fontWeight: "bolder" }}>
          Bon Jovi - Santa Fe , Trial Video Player
        </h3>
      </motion.div>

      <h2>Our Contents</h2>
      <motion.div
        className="card-container"
        drag="x"
        dragConstraints={{ left: -350, right: 350 }}
      >
        <motion.div className="Card">
          <h3>Card 1 ▶️</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
            aspernatur!
          </p>
          <h4>Services</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis autem laboriosam.
          </p>
        </motion.div>
        <motion.div className="Card">
          <h3>Card 2 ▶️</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
            aspernatur!
          </p>
          <h4>Services</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis autem laboriosam.
          </p>
        </motion.div>
        <motion.div className="Card">
          <h3>Card 3 ▶️</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
            aspernatur!
          </p>
          <h4>Services</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis autem laboriosam.
          </p>
        </motion.div>
        <motion.div className="Card">
          <h3>Card 4 ▶️</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
            aspernatur!
          </p>
          <h4>Services</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis autem laboriosam.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomePage;
