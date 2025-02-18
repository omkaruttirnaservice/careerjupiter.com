import React, { useEffect, useRef } from "react";
import Typewriter from "typewriter-effect";

const TypewriterComponent = ({ strings, autoStart = true, loop = false }) => {
  const typewriterRef = useRef(null);

  return (
    <div ref={typewriterRef}>
      <Typewriter
        options={{
          strings,
          autoStart,
          loop,
        }}
      />
    </div>
  );
};

export default TypewriterComponent;
