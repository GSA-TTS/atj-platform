import { createAppRoot } from './main';

createAppRoot(document.getElementById('root') as HTMLElement, {
  backend: {
    helloWorld: (str: string) => str,
  },
  github: import.meta.env.GITHUB,
});
