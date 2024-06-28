import { createServer } from '@atj/server/dist/index.js';

export const createCustomServer = () => {
  return createServer({
    title: 'DOJ Form Service',
  });
};
