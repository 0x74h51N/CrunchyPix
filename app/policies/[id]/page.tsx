"use client";
import PolicyCreator from "@/app/policies/[id]/components/PolicyCreator";
import { policiesPages } from "@/constants/policyDatas";
import Image from "next/image";

const PolicyPage = ({ params }: { params: { id: string } }) => {
  const selectedItem = policiesPages.find(
    (item) => item._id.toLowerCase().replace(/\s+/g, "") == params.id
  );

  if (!selectedItem) {
    console.log("Couldn't find a policyPage item.")
    return null;
  }
  return (
    <div className=" flex justify-center items-center w-full h-full min-h-[100svh] md:pb-20 pb-5">
      <div className="relative bg-cool-gray-900  md:px-28 md:py-12  p-5 rounded-xl max-w-[1100px] z-0">
        {selectedItem.image && (
          <Image
            src={"/policy/cookie.png"}
            alt="cookiePolicy"
            width={300}
            height={300}
            quality={100}
            className="absolute rotate-45 md:-left-4 md:-top-10 md:opacity-90 opacity-40 -z-10"
          />
        )}
        <div className="z-50">
          <PolicyCreator data={selectedItem.policyData} />
        </div>
      </div>
    </div>
  );
};

export default PolicyPage;
