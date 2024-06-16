import { fetchSupabaseData } from '@/lib/utils/fetchSupabaseData';
import { PoliciesTypes, PoliciesSchema } from '@/schemas';

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

export default function PolicyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
