"use client";
import PolicyCreator from "@/components/PolicyCreator/PolicyCreator";
import { cookiePolicyData } from "@/constants/policyDatas";
import Image from "next/image";

const page = () => {
  return (
    <div className=" flex justify-center items-center w-full h-full min-h-[100svh] md:mt-[8rem] mt-28">
      <div className="relative bg-cool-gray-900  md:p-32 p-5 rounded-xl max-w-[1100px] z-0">
        <Image
          src={"/policy/cookie.png"}
          alt="cookiePolicy"
          width={300}
          height={300}
          quality={100}
          className="absolute rotate-45 md:-left-4 md:-top-10 md:opacity-90 opacity-40 -z-10"
        />
        <div className="z-50">
          <PolicyCreator data={cookiePolicyData} />
        </div>
      </div>
    </div>
  );
};

export default page;
