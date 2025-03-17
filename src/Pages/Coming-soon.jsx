import React from "react";
import { motion } from "framer-motion";

const Coming = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <motion.div>
        <motion.img
          src="hhttps://img.freepik.com/free-vector/abstract-grunge-style-coming-soon-with-black-splatter_1017-26690.jpg?uid=R136446443&ga=GA1.1.248994854.1739040679&semt=ais_hybrid"
          alt="Coming Soon"
          style={{ width: "350px", cursor: "pointer" }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </div>
  );
};

export default Coming;
