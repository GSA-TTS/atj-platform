import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import express from 'express';

export type ServerOptions = {
  title: string;
};

export const createServer = async (
  serverOptions: ServerOptions
): Promise<express.Express> => {
  const app = express();
  const handler = await getHandler();
  app.use((req, res, next) => {
    // Pass ServerOptions as request locals.
    handler(req, res, next, {
      serverOptions,
    } satisfies App.Locals);
  });
  app.use(express.static(path.join(getDirname(), '../dist/client')));

  return app;
};

const getDirname = () => {
  const filePath = fileURLToPath(import.meta.url);
  return dirname(filePath);
};

const getHandler = async () => {
  // @ts-ignore
  const { handler } = await import('../dist/server/entry.mjs');
  return handler;
};
