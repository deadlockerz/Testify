const {
  FaSearch,
  FaFacebookF,
  FaGithub,
  FaTwitter,
  FaLinkedinIn,
} = require('../utils/constant');

const Footer = () => {
  return (
    <footer className='bg-zinc-400 py-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
        <div className='flex flex-col sm:flex-row justify-between'>
          <div className='mb-4 sm:mb-0 relative self-start flex flex-row-reverse'>
            <div className='relative'>
              <FaSearch className='absolute mt-3 ml-3 text-white' />
              <input
                type='text'
                className='py-2 px-8 bg-zinc-400 border-b border-gray-500 text-white placeholder-gray-300 focus:outline-none focus:border-blue-300'
                placeholder='Search...'
              />
            </div>
          </div>

          <div className='flex flex-col mb-4 sm:mb-0'>
            <h1 className='text-white text-2xl mb-1 sm:mb-0'>Who We Are</h1>
            <div className='flex flex-col'>
              <a
                href='/'
                className='text-white'
              >
                About
              </a>
              <a
                href='/'
                className='text-white mt-2'
              >
                People
              </a>
              <a
                href='/'
                className='text-white mt-2'
              >
                Careers
              </a>
              <a
                href='/'
                className='text-white mt-2'
              >
                Events
              </a>
            </div>
          </div>
          <div className='flex flex-col mb-4 sm:mb-0'>
            <h2 className='text-white text-2xl  sm:mb-0 mb-1'>Latest Work</h2>
            <div className='flex flex-col'>
              <a
                href='/'
                className='text-white'
              >
                Research
              </a>
              <a
                href='/'
                className='text-white mt-2'
              >
                Infrastructure
              </a>
              <a
                href='/'
                className='text-white mt-2'
              >
                Blog
              </a>
              <a
                href='/'
                className='text-white mt-2'
              >
                Resources
              </a>
            </div>
          </div>
        </div>
        {/* Social Icons */}
        <div className='flex flex-col justify-center sm:justify-end mt-4 '>
          <h1 className='text-white mr-4 sm:mr-0 text-2xl mb-1'>Socials</h1>
          <div className='flex'>
            <FaFacebookF className='mr-4 text-white text-3xl' />
            <FaGithub className='mr-4 text-white text-3xl' />
            <FaTwitter className='mr-4 text-white text-3xl' />
            <FaLinkedinIn className='mr-4 text-white text-3xl' />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
