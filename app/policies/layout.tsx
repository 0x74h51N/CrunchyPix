import { policiesPages } from "@/constants/policyDatas";

export default function PoliciesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}

export async function generateStaticParams() {
  const paths = policiesPages.map((item) => ({
    params: { id: item._id.toLowerCase().replace(/\s+/g, "") },
  }));

  return paths;
}
