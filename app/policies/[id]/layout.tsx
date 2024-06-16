import { fetchSupabaseData } from '@/lib/utils/fetchSupabaseData';
import { PoliciesTypes, PoliciesSchema } from '@/schemas';

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

export default function PolicyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
