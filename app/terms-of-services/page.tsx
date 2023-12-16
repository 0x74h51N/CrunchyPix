"use client";
import PolicyCreator from "@/components/PolicyCreator/PolicyCreator";
import { servicePolicyData } from "@/constants/policyDatas";

const page = () => {
  return (
    <div className=" flex justify-center items-center w-full h-full min-h-[100svh] md:mt-[8rem] mt-28">
      <div className="relative bg-cool-gray-900  md:p-32 p-5 rounded-xl max-w-[1100px]">
        <PolicyCreator data={servicePolicyData} />
      </div>
    </div>
  );
};

export default page;
