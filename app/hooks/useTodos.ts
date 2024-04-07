import { useQuery } from '@tanstack/react-query';
import { CACHE_KEY_TODOS } from '../constants';
import todoService, { Todo } from '../services/todoService';

const useTodos = () => {
  /* 
  const fetchTodos = () =>
    axios
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .then((res) => res.data);
  */

  // get query object. contains properties like data, error, isLoading
  return useQuery<Todo[], Error>({
    // queryKey: ['todos'],
    queryKey: CACHE_KEY_TODOS,
    // queryFn: fetchTodos,
    queryFn: todoService.getAll,
    retry: 3,
    staleTime: 1 * 60 * 1000
  });
};

export default useTodos;
