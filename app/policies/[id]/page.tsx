import PolicyCreator from '@/app/policies/[id]/components/PolicyCreator';
import { fetchSupabaseData } from '@/lib/utils/fetchSupabaseData';
import { PoliciesTypes, PoliciesSchema } from '@/schemas';
import { notFound } from 'next/navigation';

const PolicyPage = async ({ params }: { params: { id: string } }) => {
  if (typeof params.id !== 'string') {
    notFound();
  }

  const policyItems = await fetchSupabaseData<PoliciesTypes>(
    'policy_schema',
    'policies',
    `*`,
    PoliciesSchema,
  );

  if (
    !policyItems ||
    policyItems.length === 0 ||
    policyItems.map((item) => item.policy_name !== params.id)
  ) {
    notFound();
  } else {
    return (
      <div className=" flex justify-center items-center w-full h-auto  md:pb-20 pb-5 min-h-[100svh]">
        <div className="relative bg-cool-gray-900  md:px-28 md:py-16 p-5 rounded-xl max-w-[1100px] z-0 h-auto">
          : <PolicyCreator id={params.id} />
        </div>
      </div>
    );
  }
};

export default PolicyPage;

export async function generateStaticParams() {
  const portfolioItems = await fetchSupabaseData<PoliciesTypes>(
    'policy_schema',
    'policies',
    `*`,
    PoliciesSchema,
  );

  const paths = portfolioItems.map((item) => ({
    params: { id: item.policy_name },
  }));
  return paths;
}
