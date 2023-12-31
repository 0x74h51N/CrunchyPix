"use client";

const page = ({ slug }: { slug: string }) => {
  return (
    <div className="min-h-[100svh] h-auto w-auto min-w-[100svw]">
      <h1>Portfolio Item: {slug}</h1>
    </div>
  );
};
export default page;
