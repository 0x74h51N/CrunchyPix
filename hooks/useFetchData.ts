import { useState, useEffect } from 'react';

interface FetchDataParams {
  table: string;
  select: string;
  filterColumn?: string;
  filterValue?: string;
}

const useFetchData = ({
  table,
  select,
  filterColumn,
  filterValue,
}: FetchDataParams) => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<object | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams({
          table,
          select,
          ...(filterColumn && { filterColumn }),
          ...(filterValue && { filterValue }),
        }).toString();
        const response = await fetch(`/api/fetchData?${queryParams}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        error && setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [table, select, filterColumn, filterValue]);

  return { data, error, loading };
};

export default useFetchData;
