import React from "react";

const LearnMoreIcon = ({ width = 0, height = 0, fill = "black" } = {}) => {
  return (
    <svg className="single-arrow fadeIn" width={width} height={height}>
      <path
        fill={fill}
        d={`M 0 0 L ${width} ${height/2} L 0 ${height} L 0 0`}
        // d={`M 0 0 L ${width} ${height/2} L 0 ${height} L 0 0`}
        />
    </svg>
  );
};

export default LearnMoreIcon;
