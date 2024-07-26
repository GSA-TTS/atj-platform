/**
 * This is the entrypoint for the server. It provides a `createServer` factory
 * that return an Express handler that wraps the Astro web server.
 * This en
 */
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import express from 'express';

import { type ServerOptions, createAstroAppContext } from './context';

export const createServer = async (
  serverOptions: ServerOptions
): Promise<express.Express> => {
  const app = express();
  const handler = await getHandler();
  const ctx = await createAstroAppContext(serverOptions, import.meta.env);
  app.use((req, res, next) => {
    // Pass ServerOptions as request locals.
    handler(req, res, next, {
      ctx,
      serverOptions,
      session: null,
      user: null,
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
