import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_URL } from '../constants/api';
import { Item } from '../types';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
});

export const getItems = (
  searchValue: string,
  options: AxiosRequestConfig
): Promise<AxiosResponse<Item[]>> => {
  const url = searchValue ? `items?q=${searchValue}` : 'items';
  return api.get(url, options);
};

/*
export const addTodo = (todo: Todo): Promise<AxiosResponse<Todo>> =>
  api.post('todos', todo);

export const deleteTodo = (id: number): Promise<AxiosResponse> =>
  api.delete(`todos/${id}`);

export const updateTodo = (todo: Todo): Promise<AxiosResponse<Todo>> =>
  api.patch(`todos/${todo.id}`, todo);

*/
