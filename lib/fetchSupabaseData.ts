import supabase from '@/lib/supabaseClient';
import { ZodError, ZodSchema } from 'zod';
import { getCachedData } from './cache';

type Filter = {
  column: string;
  value: any;
};

export const fetchSupabaseData = async <T>(
  table: string,
  select: string,
  schema: ZodSchema<T>,
  filters?: Filter[],
): Promise<T[]> => {
  return getCachedData(table, async () => {
    let query = supabase.from(table).select(select);
    if (filters) {
      filters.forEach((filter) => {
        query = query.eq(filter.column, filter.value);
      });
    }

    const { data, error } = await query;
    if (error) {
      throw new Error(error.message);
    }

    try {
      const validatedData = schema.array().parse(data);
      return validatedData;
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        throw new Error('Validation error: ' + err);
      } else {
        throw new Error('Unknown validation error');
      }
    }
  });
};
