import {
  createStore as createZustandStore,
  StateCreator,
} from 'zustand/vanilla';

import { Context } from './context';

export const createAppStore = <T>(
  ctx: Context,
  initializer: (
    ctx: Context,
    set: Parameters<StateCreator<T, [], [], T>>[0]
  ) => ReturnType<StateCreator<T, [], [], T>>
) => {
  return createZustandStore<T>(set => initializer(ctx, set));
};

export type AppStore<T> = ReturnType<typeof createAppStore<T>>;
