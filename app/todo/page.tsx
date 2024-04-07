'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRef } from 'react';
import useTodos, { Todo } from '../hooks/useTodos';

export default function Page() {
  const queryClient = useQueryClient();
  const ref = useRef<HTMLInputElement>(null);
  const { data: todos, error, isLoading } = useTodos();

  interface AddTodoContext {
    previousTodos: Todo[];
  }

  const addTodo = useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: (todo: Todo) =>
      axios
        .post('https://xjsonplaceholder.typicode.com/todos', todo)
        .then((res) => res.data),

    onMutate: (newTodo) => {
      // create context. returns previous todos before updating the cache
      // return empty array if getQueryData returns undefined
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']) || [];

      queryClient.setQueryData<Todo[]>(['todos'], (todos) => [
        newTodo,
        ...(todos || [])
      ]);

      if (ref.current) ref.current.value = '';

      return { previousTodos };
    },

    onSuccess: (savedTodo, newTodo) => {
      queryClient.setQueryData<Todo[]>(['todos'], (todos) =>
        todos?.map((todo) => (todo === newTodo ? savedTodo : todo))
      );
    },

    onError: (error, newTodo, context) => {
      // check if context is undefined or falsy
      if (!context) return;

      // set query data to previous todos
      queryClient.setQueryData<Todo[]>(['todos'], context.previousTodos);
    }
  });

  if (error) return <p>{error.message}</p>;

  if (isLoading) return <p>Loading...</p>;

  return (
    <main className="p-2">
      {addTodo.error && (
        <div className="p-4 my-2 text-white text-xl bg-red-400 rounded-md">
          {addTodo.error.message}
        </div>
      )}

      <form
        className="flex gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (ref.current && ref.current.value) {
            addTodo.mutate({
              id: 0,
              title: ref.current?.value,
              completed: false,
              userId: 1
            });
          }
        }}
      >
        <input
          ref={ref}
          type="text"
          className="p-2 w-1/4 rounded-md border-2 border-black"
        />
        <button
          disabled={addTodo.isPending}
          className="bg-black w-fit text-white px-4 py-2 rounded-md"
        >
          {addTodo.isPending ? 'Adding...' : 'Add'}
        </button>
      </form>

      <div>
        <p className="text-center text-xl">Todo List:</p>
        <ul>{todos?.map((t) => <li key={t.id}>{t.title}</li>)}</ul>
      </div>
    </main>
  );
}
