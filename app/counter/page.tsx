'use client';

import useCounterStore from './store';

export default function Page() {
  const { counter, increment, reset } = useCounterStore();

  return (
    <main className="p-2">
      <p className="text-xl">Counter: {counter}</p>
      <div className="flex gap-4">
        <button
          onClick={increment}
          className="text-white bg-green-600 rounded-md px-4 py-2"
        >
          Increase
        </button>
        <button
          onClick={reset}
          className="text-white bg-blue-600 rounded-md px-4 py-2"
        >
          Reset
        </button>
      </div>
    </main>
  );
}
