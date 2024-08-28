import { fetchSupabaseData } from '@/lib/utils/fetchSupabaseData';
import {
  PoliciesTypes,
  PoliciesSchema,
  PortfolioItemProps,
  PortfolioItemSchema,
} from '@/schemas';
import { Post } from '@/types/common.types';

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

export const checkIfPageExists = async (
  mainPage: string,
  subPage?: string,
  posts?: Post[],
): Promise<boolean> => {
  const mainPages = ['policies', 'portfolio', 'about', 'blog'];

  // 1. Main Page Kontrolü
  if (!mainPages.includes(mainPage)) {
    return false;
  }

  // 2. SubPage Kontrolü
  if (subPage) {
    const subPages = await getDynamicPages(mainPage);

    // 3. Postların SubPage ile Eşleşme Kontrolü
    const postMatch = posts && posts.some((post) => post.uid === subPage);

    // SubPage ya da Post Match Eşleşmiyorsa False Döndür
    return subPages.includes(subPage) || postMatch || false;
  }

  // Eğer SubPage yoksa ve sadece MainPage kontrol ediliyorsa True Döndür
  return true;
};
