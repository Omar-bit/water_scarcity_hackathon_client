import React from 'react';

function Skeleton({ className, cercle, children }) {
  className = className || '';
  if (cercle) {
    return (
      <div
        className={`animate-pulse size-5 bg-[lightGray] rounded-full ${className}`}
      >
        {children}
      </div>
    );
  }
  return (
    <div
      className={`animate-pulse h-5 w-[200px] bg-[lightGray] rounded-lg ${className}`}
    >
      {children}
    </div>
  );
}

export default Skeleton;
