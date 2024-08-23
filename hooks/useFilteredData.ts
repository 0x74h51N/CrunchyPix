import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

type Filter<T> = {
  key: keyof T;
  value: T[keyof T];
};

type StateSelector<T> = (state: RootState) => T[];
/**
 * Custom hook for filtering data from the Redux store based on a specific key-value pair.
 *
 * @template T - The type of data being filtered, representing the structure of the items in the array.
 *
 * @param {StateSelector<T>} stateSelector - A function that selects the array of data from the Redux state.
 * @param {Filter<T>} filter - An object containing the key to filter by and the corresponding value to match.
 *
 * @returns {T[]} - An array of filtered items where the specified key matches the provided value.
 */
const useFilteredData = <T>(
  stateSelector: StateSelector<T>,
  filter: Filter<T>,
): T[] => {
  const data = useSelector(stateSelector);

  const filteredData = useMemo(() => {
    return data.filter((item) => item[filter.key] === filter.value);
  }, [data, filter.key, filter.value]);

  return filteredData;
};

export default useFilteredData;
