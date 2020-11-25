import { AxiosRequestConfig } from 'axios';
import { useState, useCallback, useEffect } from 'react';
//API
import * as API from '../api/api';
import { Item } from '../types';

export const searchItems = async (
  searchValue: string,
  options: AxiosRequestConfig
) => {
  return await API.getItems(searchValue, options);
};

export const useSearchItems = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<Item[]>([]);

  //Effects
  useEffect(() => {
    setIsLoading(false);
  }, [data]);

  const execute = async (searchValue = '', options = {}) => {
    try {
      setIsLoading(true);
      const { data: items } = await searchItems(searchValue, options);
      setData(items);
      return items;
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      throw error;
    }
  };
  return {
    isLoading,
    error,
    data,
    execute: useCallback(execute, []), // to avoid calls when inside a useEffect
  };
};
