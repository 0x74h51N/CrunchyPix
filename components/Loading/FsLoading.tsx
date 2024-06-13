import React from 'react';
import LoadingComponent from './Loading';

const FsLoading = () => {
  return (
    <div className="absolute top-0 left-0 w-[100dvw] h-[100dvh] overflow-hidden z-50 bg-black">
      <LoadingComponent />
    </div>
  );
};

export default FsLoading;
