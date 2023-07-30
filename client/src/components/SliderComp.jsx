import React, { useEffect, useRef, useState } from "react";
import { animate, motion } from "framer-motion";
import images from "./images";

function SliderComp() {
  const [width, setWidth] = useState(0);
  const carouselRef = useRef();
  useEffect(() => {
    setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
  }, []);

  return (
    <motion.div
      className="carousel"
      ref={carouselRef}
      whileTap={{ cursor: "grabbing" }}
    >
      <motion.div
        className="inner-carousel"
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        initial={{ x: 0 }}
        animate={{ x: -width }}
        transition={{ duration: 30 }}
      >
        {images.map((image, i) => {
          return (
            <motion.div className="item" key={i}>
              <img src={image} alt="" />
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

export default SliderComp;
