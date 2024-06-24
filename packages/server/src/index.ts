import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import express, { Express } from 'express';

const getDirname = () => {
  const filePath = fileURLToPath(import.meta.url);
  return dirname(filePath);
};

export const getHandler = async () => {
  // @ts-ignore
  const { handler } = await import('../dist/server/entry.mjs');
  return handler;
};
export type ServerOptions = {
  title: string;
};

export const createServer = async (
  options: ServerOptions
): Promise<express.Express> => {
  const app = express();
  const handler = await getHandler();

  app.use(handler);
  app.use(express.static(path.join(getDirname(), '../dist/client')));

  return app;
};
