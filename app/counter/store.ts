import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';

interface CounterStore {
  counter: number;
  max: number;
  increment: () => void;
  reset: () => void;
}

const useCounterStore = create<CounterStore>((set) => ({
  counter: 0,
  max: 5,
  // The `set` function will merge this property into our next state object.
  increment: () => set((store) => ({ counter: store.counter + 1 })),
  // for testing change `reset` implementation
  reset: () => set(() => ({ max: 10 }))
}));

if (process.env.NODE_ENV === 'development')
  mountStoreDevtool('Counter Store', useCounterStore);

export default useCounterStore;
