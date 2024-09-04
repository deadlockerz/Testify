import React from 'react';
import Companies from './Companies';
import PriceChart from './PriceChart';
import FullScreenVideo from './FullScreenVideo';
import TextWithVideo from './TextWithVideo';

function Hero() {
  return (
    <>
      <FullScreenVideo />
      <TextWithVideo />
      <PriceChart />
      <Companies />;
    </>
  );
}

export default Hero;
