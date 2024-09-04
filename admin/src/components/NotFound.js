import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Lottie from 'lottie-react';
const { errorAnimation } = require('../utils/constant');

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center lg:min-h-screen'>
      <div className='text-center mb-5'>
        <h1 className='text-2xl mt-5 p-2   font-bold text-blue-500'>
          Oops! That page can’t be found
        </h1>
        <div className='w-full md:w-auto h-auto max-w-md mx-auto'>
          <Lottie
            animationData={errorAnimation}
            loop
            autoplay
            className='w-full h-auto'
          />
        </div>
        <Link
          to='/'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  inline-block'
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
