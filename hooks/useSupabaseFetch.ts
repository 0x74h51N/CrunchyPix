'use client';
import { useState, useEffect } from 'react';
import supabase from '@/lib/supabaseClient';
import { ZodError, ZodSchema } from 'zod';
import { getCachedData } from '@/lib/utils/cache';

type Filter = {
  column: string;
  value: string;
};

/**
 * Custom hook for fetching data from a Supabase table with optional filtering, caching,
 * and validation using Zod schemas. This hook is designed to simplify the process of
 * querying Supabase, validating the response data, and caching the results to minimize
 * redundant network requests.
 *
 * @template T - The type of the data being fetched, inferred from the Zod schema provided.
 *
 * @param {string} schemaPath - The schema path used to query the Supabase table.
 * @param {string} table - The name of the Supabase table to fetch data from.
 * @param {string} select - The columns to select from the table, formatted as a string.
 * @param {ZodSchema<T>} schema - A Zod schema used to validate the fetched data.
 * @param {Filter[]} [filters] - Optional filters to apply to the query, allowing you to
 * fetch specific records that match certain conditions. Each filter consists of a
 * column name and a value to match.
 * @param {number} [cacheDuration=1000 * 60 * 10] - Optional cache duration in milliseconds.
 * The default is 10 minutes. This duration controls how long the fetched data is cached
 * before making a new request.
 *
 * @returns {Object} - Returns an object containing the following properties:
 *
 * - `data: T[] | null`: The fetched and validated data. Will be `null` initially and if an error occurs.
 * - `loading: boolean`: A boolean indicating whether the data is currently being fetched.
 * - `error: string | null`: A string containing an error message if an error occurs, otherwise `null`.
 *
 * @example
 * const { data, loading, error } = useSupabaseFetch<SectionsTypes>(
 *'home_schema',
 *    'sections',
 *   `*, translations(*, cards(*))`,
 *   SectionsSchema,
 *   [{ column: 'name', value: 'crunchypix' }],
 *   1000 * 60 * 5 // 5 minutes cache duration
 * );
 */
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
