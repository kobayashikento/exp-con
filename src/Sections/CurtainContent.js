import React from 'react';

import gsap from 'gsap';
import { useCurtains } from 'react-curtains';

import Slideshow from '../Components/CurtainComponents/Slideshow';

import '../Assets/styles/curtainStyle.css';

const CurtainContent = () => {
  useCurtains((curtains) => {
    // use gsap ticker to render our curtains scene
    gsap.ticker.add(curtains.render.bind(curtains));
  });

  return (
    <div>
      <Slideshow />
    </div>
  );
}

export default React.memo(CurtainContent);
