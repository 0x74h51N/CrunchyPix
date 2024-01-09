"use client";
import PolicyCreator from "@/app/policies/[id]/components/PolicyCreator";
import { policiesPages } from "@/constants/policyDatas";
import Image from "next/image";

const PolicyPage = ({ params }: { params: { id: string } }) => {
  const selectedItem = policiesPages.find(
    (item) => item._id.toLowerCase().replace(/\s+/g, "") == params.id
  );

  if (!selectedItem) {
    return <p>Couldn't find a policyPage item.</p>;
  }
  return (
    <div className=" flex justify-center items-center w-full h-full min-h-[100svh] md:mt-[14rem] mt-28">
      <div className="relative bg-cool-gray-900  md:p-32 p-5 rounded-xl max-w-[1100px] z-0">
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
