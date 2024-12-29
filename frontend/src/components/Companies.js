import React from 'react';
const { leetCode, w3w, gfg, github, codeChef } = require('../utils/constant');

function Companies() {
  return (
    <div className='bg-gray-100 py-8 md:py-16'>
      <div className='container mx-auto'>
        <div className='text-center mb-8'>
          <div className='mb-3 mt-0 text-lg whitespace-nowrap font-semibold leading-tight tracking-[-1.2px] dark:text-black xs:text-2xl sm:text-3xl md:text-[45px] md:leading-tight text-dark overflow-hidden'>
            CHOSEN BY LEARNERS WORKING AT
          </div>
        </div>
        <div className='flex flex-wrap justify-center items-center gap-4 md:gap-8 lg:gap-16'>
          <img
            src={codeChef}
            alt='CodeChef'
            className='h-8 md:h-12 lg:h-16'
          />
          <img
            src={gfg}
            alt='GeeksforGeeks'
            className='h-8 md:h-12 lg:h-16'
          />
          <img
            src={github}
            alt='GitHub'
            className='h-8 md:h-12 lg:h-16'
          />
          <img
            src={w3w}
            alt='W3Schools'
            className='h-8 md:h-12 lg:h-16'
          />
          <img
            src={leetCode}
            alt='LeetCode'
            className='h-8 md:h-12 lg:h-16'
          />
        </div>
      </div>
    </div>
  );
}

export default Companies;
