"use client";
import React from "react";
import { Hourglass } from "react-loader-spinner";

const LoadingComponent = () => {
  return (
    <div className="loading-container w-full h-full flex flex-row justify-center items-center">
      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={["white", "#050816"]}
      />
      <p className=" text-stone-200">Loading...</p>
    </div>
  );
};

export default LoadingComponent;
