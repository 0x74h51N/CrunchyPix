import { useState, useEffect } from 'react';

const useSupabaseFetch = (table: string, select: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `/api/supabase-fetch?table=${table}&select=${select}`,
        );
        const result = await response.json();
        if (response.ok) {
          setData(result.data);
        } else {
          setError(result.error);
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
  }, [table, select]);

  return { data, loading, error };
};

export default useSupabaseFetch;
