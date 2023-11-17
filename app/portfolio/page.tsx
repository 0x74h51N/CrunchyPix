import LoadingComponent from "@/components/Loading";
import React from "react";

const page = () => {
  return (
    <section>
      <div className="h-screen w-screen flex justify-center items-center">
        <LoadingComponent />
      </div>
    </section>
  );
};

export default page;
