"use client";
import PolicyCreator from "@/components/PolicyCreator/PolicyCreator";
import { gdpr } from "@/constants/policyDatas";

const page = () => {
  return (
    <div className=" flex justify-center items-center w-full h-full min-h-[100svh] md:mt-[8rem] mt-28">
      <div className="relative bg-cool-gray-900  md:p-32 p-5 rounded-xl max-w-[1100px] z-0">
        <div className="z-50">
          <PolicyCreator data={gdpr} />
        </div>
      </div>
    </div>
  );
};

export default page;
