import PolicyCreator from '@/app/[lang]/policies/[id]/components/PolicyCreator';
import { generatePageMetadata } from '@/lib/metadata';
import { PoliciesSchema, PoliciesTypes } from '@/lib/schemas';
import { fetchSupabaseData } from '@/lib/utils/fetchSupabaseData';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  try {
    const policyItems = await fetchSupabaseData<PoliciesTypes>(
      'policy_schema',
      'policies',
      `*`,
      PoliciesSchema,
    );

    if (!policyItems) {
      throw new Error('Failed to fetch portfolio items');
    }

    return policyItems.map((item) => ({
      id: item.policy_name,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}
export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('policies');
}

const PolicyPage = async ({ params }: { params: { id: string } }) => {
  const resolvedParams = params ? await params : null;
  const { id } = resolvedParams || {};
  if (typeof id !== 'string') {
    notFound();
  }

  const policyItems = await fetchSupabaseData<PoliciesTypes>(
    'policy_schema',
    'policies',
    `*`,
    PoliciesSchema,
  );
  if (policyItems) {
    const policyItem = policyItems.find((item) => item.policy_name === id);
    if (!policyItem) {
      notFound();
    } else {
      return (
        <div className=" flex justify-center cursor-none items-center w-full h-auto  md:pb-20 pb-5 min-h-[100svh]">
          <div className="relative bg-cool-gray-900  md:px-28 md:py-16 p-5 rounded-xl max-w-[1100px] z-0 h-auto">
            <PolicyCreator id={id} />
          </div>
        </div>
      );
    }
  } else notFound();
};

export default PolicyPage;
