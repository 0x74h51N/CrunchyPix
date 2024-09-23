import supabase from '@/lib/supabaseClient';
import { ZodError, ZodSchema } from 'zod';
import { getCachedData } from './cache';
import xss from 'xss';

type Filter = {
  column: string;
  value: string;
};

export const fetchSupabaseData = async <T>(
  schemaPath: string,
  table: string,
  select: string,
  schema: ZodSchema<T>,
  filters?: Filter[],
): Promise<T[]> => {
  return getCachedData(table, async () => {
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

    const sanitizedData = data.map((item) => {
      const sanitizedItem = {} as any;
      for (const key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          const value = item[key];
          sanitizedItem[key] = typeof value === 'string' ? xss(value) : value;
        }
      }
      return sanitizedItem;
    });

    try {
      const validatedData = schema.array().parse(sanitizedData);
      return validatedData;
    } catch (err) {
      if (err instanceof ZodError) {
        throw new Error('Validation error: ' + err);
      } else {
        throw new Error('Unknown validation error');
      }
    }
  });
};
