import { createContext, useContext, useState } from 'react';
import { useStore } from 'zustand';

import { Backend, Context } from '../state/context';
import { AppStore } from '../state/store';

export const AppContext = createContext<Context>({
  backend: {} as Backend,
});

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({
  children,
  context,
}: {
  children: React.ReactNode;
  context: Context;
}) => {
  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export const useAppStore = <T,>(initStore: (ctx: Context) => AppStore<T>) => {
  const ctx = useAppContext();
  const [appStore, _] = useState<AppStore<T>>(() => {
    return initStore(ctx);
  });
  return useStore(appStore);
};
