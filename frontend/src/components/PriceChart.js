import React from 'react';
import PriceCard from './PriceCard';

function PriceChart() {
  return (
    <div className='PriceChart'>
      <PriceCard
        plan='Personal'
        price='$59'
        duration='year'
        description='Perfect for using in a personal website or a client project.'
        features={[
          '1 User',
          'All UI components',
          'Lifetime access',
          'Free updates',
          'Use on 1 (one) project',
          '3 Months support',
        ]}
      />
    </div>
  );
}

export default PriceChart;
