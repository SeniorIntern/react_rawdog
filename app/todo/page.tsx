'use client';

import { useRef } from 'react';
import useAddTodo from '../hooks/useAddTodo';
import useTodos from '../hooks/useTodos';

export default function Page() {
  const ref = useRef<HTMLInputElement>(null);
  const { data: todos, error, isLoading } = useTodos();

  const addTodo = useAddTodo(() => {
    if (ref.current) ref.current.value = '';
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
          Add
        </button>
      </form>

      <div>
        <p className="text-center text-xl">Todo List:</p>
        <ul>{todos?.map((t) => <li key={t.id}>{t.title}</li>)}</ul>
      </div>
    </main>
  );
}
