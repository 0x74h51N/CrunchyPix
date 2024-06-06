'use client';
import { useState, useEffect } from 'react';
import supabase from '@/lib/supabaseClient';
import { z, ZodError, ZodSchema } from 'zod';

type Filter = {
  column: string;
  value: any;
};

const useSupabaseFetch = <T>(
  table: string,
  select: string,
  schema: ZodSchema<T>,
  filters?: Filter[],
) => {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        let query = supabase.from(table).select(select);
        if (filters) {
          filters.forEach((filter) => {
            query = query.eq(filter.column, filter.value);
          });
        }
        const { data, error } = await query;
        if (error) {
          setError(error.message);
        } else {
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
  }, [table, select, schema]);

  return { data, loading, error };
};

export default useSupabaseFetch;
