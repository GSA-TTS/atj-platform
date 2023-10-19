import { type GithubRepository } from './lib/github';

export const getAppContext = (env?: any): AppContext => {
  return {
    github: env?.GITHUB,
  };
};

export type AppContext = {
  github: GithubRepository;
};
