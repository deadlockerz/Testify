import React from 'react';
const { heroVideo, FaArrowRight } = require('../utils/constant');

function FullScreenVideo() {
  const heading = 'Testify';
  const description = '-where learning meets no requirement';

  return (
    <div className='relative h-screen '>
      <video
        src={heroVideo}
        className='absolute top-0 left-0 w-full h-full object-cover'
        disablePictureInPicture
        autoPlay
        loop
        muted
      />
      <div className='absolute top-1/2 left-4 lg:left-20 transform -translate-y-1/2 text-white text-left lg:pl-12'>
        <h2 className='text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl mb-4 '>
          {heading}
        </h2>
        <p className='text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl'>
          {description}
        </p>
        <a
          href='/learn-more'
          className='flex items-center mt-4 text-lg text-white hover:text-gray-300'
        >
          Learn more <FaArrowRight className='ml-2' />
        </a>
      </div>
    </div>
  );
}

export default FullScreenVideo;
