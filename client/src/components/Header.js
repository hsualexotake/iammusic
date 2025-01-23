import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Header = () => {
  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1 },
    }),
  };

  return (
    <motion.nav
      className="header bg-light p-3"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="shadow container d-flex justify-content-between align-items-center rounded-none border border-white border-opacity-40 shadow-black/[0.03] backdrop-blur-[0.5rem] top-6 h-[3.25rem] w-[36rem] sm:rounded-full">
        {/* Logo */}
        <motion.div className="logo" variants={linkVariants} custom={5}>
          <Link to="/" className="text-decoration-none text-dark h4">
            Queue
          </Link>
        </motion.div>

        {/* Links */}
        <div className="d-flex">
          <motion.div className="mx-3" variants={linkVariants} custom={5}>
            <Link to="/" className="text-decoration-none text-dark">
              Home
            </Link>
          </motion.div>
          <motion.div className="mx-3" variants={linkVariants} custom={5}>
            <Link to="/todo" className="text-decoration-none text-dark">
              Todo App
            </Link>
          </motion.div>
          <motion.div className="mx-3" variants={linkVariants} custom={5}>
            <Link to="/join" className="text-decoration-none text-dark">
              Join Room
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Header;
