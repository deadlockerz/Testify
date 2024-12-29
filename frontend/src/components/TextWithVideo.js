import React from 'react';
const { video, FaArrowRight } = require('../utils/constant');

const TextWithVideoContainer = ({ order }) => {
  return (
    <div className='w-full flex flex-col md:flex-row items-center justify-center p-10 md:mt-20 mb-8 sm:mb-80 rounded-3xl'>
      {/* Video container */}
      <div
        className={`video-container flex justify-center items-center md:order-${order}`}
      >
        <video
          src={video}
          className='object-cover rounded-3xl'
          disablePictureInPicture
          autoPlay
          loop
          muted
        />
      </div>

      {/* Text container */}
      <div className='text-container p-4 md:p-8 md:order-1 w-full md:w-1/2 text-center'>
        <h2 className='text-2xl sm:text-3xl md:text-4xl xl:text-5xl mb-4'>
          Testify
        </h2>
        <p className='text-sm sm:text-base md:text-md xl:text-xl mb-4'>
          - where learning meets no requirement
        </p>
        <a
          href='/learn-more'
          className='flex justify-center items-center mt-4 text-lg text-black hover:text-gray-500'
        >
          Learn more <FaArrowRight className='ml-2' />
        </a>
      </div>
    </div>
  );
};

const TextWithVideo = () => {
  return (
    <>
      <TextWithVideoContainer order={2} />
      <TextWithVideoContainer order={1} />
    </>
  );
};
export default TextWithVideo;
