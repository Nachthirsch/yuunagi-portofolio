import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';


const ButtonWrapper = styled.div`
  * {
    transition-property: all;
    transition-duration: 0.2s;
    transition-timing-function: cubic-bezier(100,50,21,6);
  }

  .btn {
    position: relative;
    display: inline-block;
    width: 166px;
    height: 45px;
    font-size: 12px;
    line-height: 45px;
    text-align: center;
    text-transform: uppercase;
    color: #404040;
    cursor: pointer;
    overflow: hidden;
  }

  .btn svg {
    position: absolute;
    top: 0;
    left: 0;
  }

  .btn svg rect {
    fill: none;
    stroke: #404040;
    stroke-width: 1;
    stroke-dasharray: 422, 0;
    transition: all 1.3s cubic-bezier(0.19, 1, 0.22, 1);
  }

  .btn:hover svg rect {
    stroke-width: 2;
    stroke-dasharray: 10, 310;
    stroke-dashoffset: 33;
    stroke: #737373;
  }

  .btn:hover {
    color: #737373;
    font-size: 14px;
    letter-spacing: 1px;
    font-weight: medium;
  }
`;

const AnimatedButton = ({ text = "Download Resume", downloadPath, onClick }) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick || (downloadPath ? () => undefined : undefined)}
    >
      <ButtonWrapper>
        <a href={downloadPath} download className="btn">
          <svg width="166" height="45">
            <rect x="0" y="0" fill="none" width="166" height="45"/>
          </svg>
          {text}
        </a>
      </ButtonWrapper>
    </motion.button>
  );
};

export default AnimatedButton;