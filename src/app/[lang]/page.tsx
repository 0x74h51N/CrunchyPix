import HomeClient from '@/components/HomeClient';
import FsLoading from '@/components/Loading/FsLoading';
import { Locales } from '@/i18n/settings';
import { SectionsSchema, SectionsTypes } from '@/lib/schemas';
import { fetchSupabaseData } from '@/lib/utils/fetchSupabaseData';
import filterByLanguage from '@/lib/utils/filterByLanguage';

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: Locales }> | undefined;
}) {
  const resolvedParams = params ? await params : { lang: 'en' as Locales };
  const { lang } = resolvedParams;

  const data = await fetchSupabaseData<SectionsTypes>(
    'home_schema',
    'sections',
    `*, translations(*, cards(*))`,
    SectionsSchema,
  );

  if (!data) {
    return <FsLoading />;
  }
  const filteredData = filterByLanguage({
    items: data,
    language: lang,
    localPath: 'translations',
  });

  return <HomeClient initialSections={filteredData} />;
}
