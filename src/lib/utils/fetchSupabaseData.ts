import supabase from '@/lib/supabaseClient';
import { ZodError, ZodSchema } from 'zod';
import { unstable_cache } from 'next/cache';

type Filter = {
  column: string;
  value: string;
};

export const fetchSupabaseData = unstable_cache(
  async <T>(
    schemaPath: string,
    table: string,
    select: string,
    schema: ZodSchema<T>,
    filters?: Filter[],
  ): Promise<T[] | undefined> => {
    let query = supabase.schema(schemaPath).from(table).select(select);
    if (filters) {
      filters.forEach((filter) => {
        query = query.eq(filter.column, filter.value);
      });
    }

    const { data, error } = await query;
    if (error) {
      throw new Error(error.message);
    }
    if (!data) {
      throw new Error('No data returned');
    }

    try {
      const validatedData = schema.array().safeParse(data);
      if (validatedData.success) return validatedData.data;
    } catch (err) {
      if (err instanceof ZodError) {
        throw new Error('Validation error: ' + err);
      } else {
        throw new Error('Unknown validation error');
      }
    }
  },
  ['schemaPath', 'table', 'select', 'filters'],
  { revalidate: 300 },
);
