import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const AnimatedProgressbar = ({ value, strokeColor }) => {
  const [displayValue, setDisplayValue] = useState(0);

  const props = useSpring({
    from: { val: 0 },
    to: { val: value },
    config: { duration: 800 },
    onChange: (anim) => {
      setDisplayValue(Math.round(anim.value.val));
    },
  });

  return (
    <div
      className="animated-circular-progressbar"
      style={{ maxWidth: "150px" }}
    >
      <CircularProgressbar
        value={displayValue}
        text={`${displayValue}%`}
        strokeWidth={6}
        styles={{
          // Customize the path, i.e. the "completed progress"
          path: {
            stroke: strokeColor,
            strokeLinecap: "round",
            transition: "stroke 0.5s ease-in-out",
          },
          // Customize the circle behind the path, i.e. the "total progress"
          trail: {
            stroke: "rgba(255,255,255,0.3)",
          },
          // Customize the text
          text: {
            fill: "#ffffff",
            fontSize: "18px",
          },
        }}
      />
    </div>
  );
};

export default AnimatedProgressbar;
