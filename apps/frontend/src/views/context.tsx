import { createContext, useContext } from 'react';

export interface Backend {
  helloWorld(echoValue: string): string;
}

export interface Context {
  backend: Backend;
}

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
