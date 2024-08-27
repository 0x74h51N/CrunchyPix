import { fetchSupabaseData } from '@/lib/utils/fetchSupabaseData';
import {
  PoliciesTypes,
  PoliciesSchema,
  PortfolioItemProps,
  PortfolioItemSchema,
} from '@/schemas';

const getDynamicPages = async (mainPage: string): Promise<string[]> => {
  if (mainPage === 'policies') {
    const policyItems = await fetchSupabaseData<PoliciesTypes>(
      'policy_schema',
      'policies',
      `*`,
      PoliciesSchema,
    );
    return policyItems.map((item) => item.policy_name);
  } else if (mainPage === 'portfolio') {
    const portfolioItems = await fetchSupabaseData<PortfolioItemProps>(
      'portfolio_schema',
      'portfolio_items',
      '*',
      PortfolioItemSchema,
    );
    return portfolioItems.map((item) => item._id);
  }
  return [];
};

export const checkIfPageExists = async (mainPage: string, subPage?: string) => {
  const mainPages = ['policies', 'portfolio', 'about', 'blog'];
  if (!mainPages.includes(mainPage)) {
    return false;
  }
  if (subPage) {
    const subPages = await getDynamicPages(mainPage);
    return subPages.includes(subPage);
  }
  return true;
};
