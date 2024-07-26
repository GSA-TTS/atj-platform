import { createServer } from '@atj/server/dist/handler.js';

export const createCustomServer = () => {
  return createServer({
    title: 'DOJ Form Service',
  });
};
