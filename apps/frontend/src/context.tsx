import { createContext, useContext } from 'react';
import { GithubRepository } from './lib/github';

export interface Backend {
  helloWorld(echoValue: string): string;
}

export interface Context {
  backend: Backend;
  github: GithubRepository;
}

export const AppContext = createContext<Context>({
  backend: {} as Backend,
  github: {} as GithubRepository,
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
