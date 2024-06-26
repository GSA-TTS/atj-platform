import { createServer } from '@atj/server/dist/index.js';

export const createCustomServer = () => {
  return createServer({
    title: 'Kansas State Courts Form Service',
  });
};
