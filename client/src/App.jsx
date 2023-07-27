import { useState } from "react";
import "./index.css";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

function App() {
  return (
    <div>
      <div className="navbar-container">
        <div className="navbar-items"></div>
        <h1 className="h1-title">AHA WEB-KTV</h1>
      </div>
      <motion.div className="body-container">
        <Outlet />
      </motion.div>
    </div>
  );
}

export default App;
