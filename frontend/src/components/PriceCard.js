import React from 'react';

export default function PriceCard({
  plan,
  price,
  duration,
  description,
  features,
}) {
  return (
    <div className='container mx-auto'>
      <div className='-mx-4 flex flex-wrap'>
        <div className='w-full px-4'>
          <div className='mx-auto mb-[60px] max-w-[510px] text-center'>
            <span className='mb-2 block text-3xl font-semibold text-primary'>
              Our Pricing Plan
            </span>

            <p className='text-base text-body-color dark:text-dark-6'>
              There are many variations of passages of Lorem Ipsum available but
              the majority have suffered alteration in some form.
            </p>
          </div>
        </div>
      </div>
      <div className='flex justify-center items-center'>
        <div className='flex justify-center items-center'>
          {' '}
          <div className='w-full px-4'>
            <div className='relative z-10 mb-10 overflow-hidden rounded-[10px] border-2 border-stroke bg-white px-8 py-10 shadow-pricing dark:border-dark-3 dark:bg-dark-2 sm:p-12 lg:px-6 lg:py-10 xl:p-[50px]'>
              <span className='mb-3 block text-lg font-semibold text-primary'>
                {plan}
              </span>
              <h2 className='mb-5 text-[42px] font-bold text-dark dark:text-white'>
                <span>{price}</span>
                <span className='text-base font-medium text-body-color dark:text-dark-6'>
                  /{duration}
                </span>
              </h2>
              <p className='mb-8 border-b border-stroke pb-8 text-base text-body-color dark:border-dark-3 dark:text-dark-6'>
                {description}
              </p>
              <div className='mb-9 flex flex-col gap-[14px]'>
                {features.map((feature, index) => (
                  <p
                    key={index}
                    className='text-base text-body-color dark:text-dark-6'
                  >
                    {feature}
                  </p>
                ))}
              </div>
              <a
                href='/'
                className='block w-full rounded-md border border-stroke bg-transparent p-3 text-center text-base font-medium text-primary transition hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3'
              >
                Choose {plan}
              </a>
              <div>
                <span className='absolute right-0 top-7 z-[-1]'>
                  <svg
                    width='77'
                    height='172'
                    viewBox='0 0 77 172'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <circle
                      cx='86'
                      cy='86'
                      r='86'
                      fill='url(#paint0_linear)'
                    />
                    <defs>
                      <linearGradient
                        id='paint0_linear'
                        x1='86'
                        y1='0'
                        x2='86'
                        y2='172'
                        gradientUnits='userSpaceOnUse'
                      >
                        <stop
                          stopColor='#3056D3'
                          stopOpacity='0.09'
                        />
                        <stop
                          offset='1'
                          stopColor='#C4C4C4'
                          stopOpacity='0'
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <span className='absolute right-4 top-4 z-[-1]'>
                  {/* Insert circles SVG here */}
                </span>
              </div>
            </div>
          </div>{' '}
        </div>
      </div>
    </div>
  );
}
