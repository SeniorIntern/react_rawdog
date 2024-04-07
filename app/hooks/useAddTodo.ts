import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CACHE_KEY_TODOS } from '../constants';
import APIClient from '../services/apiClient';
import { Todo } from './useTodos';

const apiClient = new APIClient<Todo>('/todos');

interface AddTodoContext {
  previousTodos: Todo[];
}

const useAddTodo = (onAdd: () => void) => {
  const queryClient = useQueryClient();

  // return the object
  return useMutation<Todo, Error, Todo, AddTodoContext>({
    /*
    mutationFn: (todo: Todo) =>
      axios
        .post('https://jsonplaceholder.typicode.com/todos', todo)
        .then((res) => res.data),
  */
    mutationFn: apiClient.post,
    onMutate: (newTodo) => {
      // create context. returns previous todos before updating the cache
      // return empty array if getQueryData returns undefined
      const previousTodos =
        queryClient.getQueryData<Todo[]>(CACHE_KEY_TODOS) || [];

      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos) => [
        newTodo,
        ...(todos || [])
      ]);

      onAdd(); // call function passed by consumer

      return { previousTodos };
    },

    onSuccess: (savedTodo, newTodo) => {
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos) =>
        todos?.map((todo) => (todo === newTodo ? savedTodo : todo))
      );
    },

    onError: (error, newTodo, context) => {
      // check if context is undefined or falsy
      if (!context) return;

      // set query data to previous todos
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, context.previousTodos);
    }
  });
};

export default useAddTodo;
