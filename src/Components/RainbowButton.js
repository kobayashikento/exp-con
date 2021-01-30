import styled from 'styled-components';

import { REVIEW_CTA_HEIGHT, REVIEW_CTA_WIDTH, REVIEW_CTA_FONT } from '../Assets/styles/masterStyle';

export default styled.button`
  outline: 0;
  cursor: pointer;
  border-radius: 79px;
  font: ${REVIEW_CTA_FONT};
  letter-spacing: 1.8px;
  overflow: hidden;
  position: relative; //absolute
  height: ${REVIEW_CTA_HEIGHT}px;
  height: ${REVIEW_CTA_WIDTH}px;
  text-transform: uppercase;
  -webkit-tap-highlight-color: transparent;
  transition: all 500ms ease-in-out;
  &::after,
  &::before {
    content: "";
    position: absolute;
  }
  &:hover,
  &:focus {
    background: transparent linear-gradient(90deg, #1fe1e9 0%, #5e33d1 34%, #d34848 65%, #ffb33f 100%) 0% 0% no-repeat padding-box;
  }

  &::after {
    background: transparent linear-gradient(90deg, #1fe1e9 0%, #5e33d1 34%, #d34848 65%, #ffb33f 100%) 0% 0% no-repeat padding-box;;
    border-radius: 79px;
    content: ${(props) => `${props.txt}`};
    color: #fff;
    top: 20px;
    left: 64px;
    -moz-user-select: none;
    user-select: none;
    user-drag: none;
  }
  &::before {
    background: transparent;
    border-radius: 100%;
    top: 50%;
    left: 50%;
    box-shadow: 0 1em 2em 3em rgba(255, 50, 0, 0.5), -4em -2em 2em 2em rgba(255, 0, 150, 0.5),
      -4em 2em 2em 4em rgba(0, 0, 150, 0.5), 0 -3em 2em 3em rgba(31, 225, 233, 0.8);
    width: 0;
    height: 0;
    animation: mix 4s linear infinite;
  }

@keyframes mix {
    30% {
      box-shadow: 0 -1em 2em 3em rgba(211, 72, 72, 1), 4em -1em 2em 3em rgba(255, 179, 63, 1),
        -4em 2em 3em 2em rgba(94, 51, 209, 1), -4em -2em 2em 2em rgba(31, 225, 233, 1);
    }
    60% {
      box-shadow: 2em 1em 2em 3em rgba(94, 51, 209, 1), 3em 1em 2em 3em rgba(31, 225, 233, 0.8),
        3em -2em 3em 3em rgba(31, 225, 233, 1), -4em 2em 2em 3em rgba(200, 0, 50, 0.8),
        0 -3em 2em 3em rgba(31, 225, 233, 1), -2em 1em 2em 3em rgba(50, 210, 250, 0.8);
    }
  }
`;
