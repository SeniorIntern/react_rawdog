import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CACHE_KEY_TODOS } from '../constants';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

const useTodos = () => {
  const fetchTodos = () =>
    axios
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .then((res) => res.data);

  // get query object. contains properties like data, error, isLoading
  return useQuery<Todo[], Error>({
    // queryKey: ['todos'],
    queryKey: CACHE_KEY_TODOS,
    queryFn: fetchTodos,
    retry: 3,
    staleTime: 1 * 60 * 1000
  });
};

export default useTodos;
