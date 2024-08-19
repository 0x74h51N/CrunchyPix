'use client';
import { useState, useEffect } from 'react';
import supabase from '@/lib/supabaseClient';
import { ZodError, ZodSchema } from 'zod';
import { getCachedData } from '@/lib/utils/cache';

type Filter = {
  column: string;
  value: any;
};

const useSupabaseFetch = <T>(
  schemaPath: string,
  table: string,
  select: string,
  schema: ZodSchema<T>,
  filters?: Filter[],
  cacheDuration: number = 1000 * 60 * 10,
) => {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const cacheKey = `${table}-${JSON.stringify(filters)}`;

      try {
        const fetcher = async () => {
          let query = supabase.schema(schemaPath).from(table).select(select);
          if (filters) {
            const filterQueries = filters
              .map((filter) => `${filter.column}.eq.${filter.value}`)
              .join(',');
            query = query.or(filterQueries);
          }
          const { data, error } = await query;
          if (error) {
            throw new Error(error.message);
          }
          return data;
        };

        const data = await getCachedData(cacheKey, fetcher, cacheDuration);

        try {
          const validatedData = schema.array().parse(data);
          setData(validatedData);
        } catch (err: unknown) {
          if (err instanceof ZodError) {
            setError(
              'Validation error: ' +
                err.errors.map((e) => e.message).join(', '),
            );
          } else {
            setError('Unknown validation error');
          }
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [table, select, schema, cacheDuration, filters]);

  return { data, loading, error };
};

export default useSupabaseFetch;
