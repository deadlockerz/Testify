import React from 'react';

const CopyrightBar = () => {
  return (
    <div className='flex flex-row md:flex-row justify-between items-center bg-white p-4 '>
      <div className='flex flex-col md:flex-row md:space-x-6'>
        <a
          href='/privacy-policy'
          className='text-base text-body-color text-dark-6 hover:text-primary md:text-left'
        >
          Privacy Policy
        </a>
        <a
          href='/terms'
          className='text-base text-body-color text-dark-6 hover:text-primary md:text-left'
        >
          Terms
        </a>
        <a
          href='/cookies'
          className='text-base text-body-color text-dark-6 hover:text-primary md:text-left'
        >
          Cookies
        </a>
      </div>
      <p className='text-base text-body-color text-dark-6 mt-2 md:mt-0 md:order-none order-last md:text-right'>
        Testify &copy; 2024
      </p>
    </div>
  );
};

export default CopyrightBar;
