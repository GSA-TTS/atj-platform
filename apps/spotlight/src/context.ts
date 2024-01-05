import { type GithubRepository } from './lib/github';

export type AppContext = {
  baseUrl: `${string}/`;
  github: GithubRepository;
};

let _context: AppContext = null;

export const getAppContext = (): AppContext => {
  if (_context === null) {
    _context = createAppContext(import.meta.env);
  }
  return _context;
};

const createAppContext = (env: any) => {
  return {
    github: env.GITHUB,
    baseUrl: env.BASE_URL,
  };
};
