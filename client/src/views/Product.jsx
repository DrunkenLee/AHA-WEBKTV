import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import "../index.css";
import CardComp from "../components/CardComp";

const containerVariant = {
  hidden: {
    opacity: 0,
    y: -10000,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      type: "spring",
    },
  },
  exit: {
    y: -10000,
    transition: {
      duration: 1,
    },
  },
};

const cardVariant = {
  hover: {
    y: 50,
    scale: 1.1,
    z: 1,
  },
  tap: {},
};

const ProductPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const playerRef = useRef(null);

  return (
    <motion.div
      className="home-container"
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      exit={{ y: -1000 }}
    >
      <h1>Our Plans</h1>
      <motion.div className="card-container">
        <motion.div variants={cardVariant} whileHover="hover" whileTap="tap">
          <CardComp
            title={"Personal Setup"}
            description={
              "The home karaoke setup service will offer customers a comprehensive package that includes high-quality karaoke equipment, a wide selection of songs, and professional support for setup and troubleshooting. Customers can enjoy singing their favorite songs in the privacy of their homes, hosting parties, family gatherings, and special events with a karaoke system that ensures an engaging and entertaining experience."
            }
            imageUrl={
              "https://media.blogto.com/articles/rankedlistings/2022/02/21/studio-lounge-karaoke-toronto-e2722116.jpg?w=720&cmd=resize_then_crop&height=480&quality=70"
            }
          />
        </motion.div>
        <motion.div variants={cardVariant} whileHover="hover">
          <CardComp
            title={"Bussiness Plan"}
            description={
              "Our Karaoke Business aims to revolutionize the karaoke industry by offering high-quality private karaoke lounges equipped with the latest audio-visual technology. Customers can enjoy singing their favorite songs in a private setting, Our mission is to provide an immersive and enjoyable karaoke experience that resonates with people of all ages and backgrounds."
            }
            imageUrl={
              "https://atouchofbusiness.com/wp-content/uploads/2022/01/karaoke-microphone.jpg"
            }
          />
        </motion.div>
        <motion.div variants={cardVariant} whileHover="hover">
          <CardComp
            title={"Customized Plan"}
            description={
              "The home karaoke setup business presents an exciting opportunity to tap into the growing demand for home entertainment options. By providing top-notch equipment, a vast song library, and excellent customer support, the business aims to become the go-to choice for individuals and families seeking an engaging and enjoyable karaoke experience in the comfort of their homes. And of course fully customized"
            }
            imageUrl={
              "https://static.designmynight.com/uploads/2023/03/maneki-restaurant-and-karaoke-dublin-2-optimised.jpg"
            }
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProductPage;
