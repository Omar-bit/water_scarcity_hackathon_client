import React from 'react';

const BarProgress = ({ minVal, maxVal, val }) => {
  const progress = ((val - minVal) / (maxVal - minVal)) * 100;

  return (
    <div className='w-full bg-gray-200 rounded-full h-6 -rotate-90'>
      <div
        className='bg-main h-6 rounded-full'
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default BarProgress;
