import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

type Filter<T> = {
  key: keyof T;
  value: any;
};

type StateSelector<T> = (state: RootState) => T[];

const useFilteredData = <T>(
  stateSelector: StateSelector<T>,
  filter: Filter<T>,
): T[] => {
  const data = useSelector(stateSelector);

  const filteredData = useMemo(() => {
    return data.filter((item) => item[filter.key] === filter.value);
  }, [data]);

  return filteredData;
};

export default useFilteredData;
