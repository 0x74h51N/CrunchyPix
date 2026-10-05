import supabase from '@/lib/supabaseClient';
import { unstable_cache } from 'next/cache';
import { ZodError, ZodSchema } from 'zod';

type Filter = {
  column: string;
  value: string;
};

// Upstream outages (e.g. Cloudflare 5xx pages) come back as full HTML
// documents; keep only the <title> so build logs stay readable.
const shortenErrorMessage = (message: string) => {
  const title = message.match(/<title>([^<]*)<\/title>/i)?.[1];
  if (title) return title.trim();
  return message.length > 300 ? `${message.slice(0, 300)}…` : message;
};

export const fetchSupabaseData = async <T>(
  schemaPath: string,
  table: string,
  select: string,
  schema: ZodSchema<T>,
  filters?: Filter[],
): Promise<T[] | undefined> => {
  const filterKey = filters
    ? filters.map((f) => `${f.column}:${f.value}`).join('-')
    : 'no-filters';

  const cacheKey = `${schemaPath}-${table}-${select}-${filterKey}`;

  const cachedFetch = unstable_cache(async () => {
    let query = supabase.schema(schemaPath).from(table).select(select);
    if (filters) {
      filters.forEach((filter) => {
        query = query.eq(filter.column, filter.value);
      });
    }

    const { data, error } = await query;
    if (error) {
      throw new Error(shortenErrorMessage(error.message));
    }
    if (!data) {
      throw new Error('No data returned');
    }

    try {
      const validatedData = schema.array().safeParse(data);
      if (validatedData.success) return validatedData.data;
      throw new Error('Validation failed');
    } catch (err) {
      if (err instanceof ZodError) {
        throw new Error('Validation error: ' + err);
      } else {
        throw new Error('Unknown validation error');
      }
    }
  }, [cacheKey]);

  return cachedFetch();
};
