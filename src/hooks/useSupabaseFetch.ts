'use client';
import supabase from '@/lib/supabaseClient';
import { useQuery } from '@tanstack/react-query';
import { ZodSchema } from 'zod';

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
 * @param {number} [cacheDuration=1000 * 60 * 60] - Optional cache duration in milliseconds.
 * The default is an hour. This duration controls how long the fetched data is cached
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

const fetchSupabaseData = async <T>(
  schemaPath: string,
  table: string,
  select: string,
  schema: ZodSchema<T>,
  filters?: Filter[],
): Promise<T[]> => {
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

  const validatedData = schema.array().parse(data);
  return validatedData;
};

const useSupabaseFetch = <T>(
  schemaPath: string,
  table: string,
  select: string,
  schema: ZodSchema<T>,
  filters?: Filter[],
  cacheDuration: number = 1000 * 60 * 60,
) => {
  const filterKey = filters
    ? filters.map((f) => `${f.column}:${f.value}`).join(',')
    : 'no-filter';

  const queryKey = ['supabaseData', schemaPath, table, select, filterKey];

  const { data, isLoading, error } = useQuery<T[]>({
    queryKey,
    queryFn: async () => {
      const result = await fetchSupabaseData(
        schemaPath,
        table,
        select,
        schema,
        filters,
      );
      return result;
    },
    staleTime: cacheDuration,
    refetchOnWindowFocus: false,
  });

  return { data, loading: isLoading, error: error?.message || null };
};

export default useSupabaseFetch;
