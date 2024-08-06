/**
 * This is the entrypoint for the server. It provides a `createServer` factory
 * that return an Express handler that wraps the Astro web server.
 * This en
 */
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import express from 'express';

import { type LoginGovOptions } from '@atj/auth';
import { type DevDatabaseContext } from '@atj/database';

import { type ServerOptions } from './src/context';

export const createServerAuth = async ({
  database,
  loginGovOptions,
}: {
  database: DevDatabaseContext;
  loginGovOptions: LoginGovOptions;
}) => {
  return createServer({
    title: 'DOJ Form Service',
    database,
    loginGovOptions: {
      loginGovUrl: 'https://idp.int.identitysandbox.gov',
      clientId:
        'urn:gov:gsa:openidconnect.profiles:sp:sso:gsa:tts-10x-atj-dev-server-doj',
      clientSecret: '',
      redirectURI: 'http://localhost:4322/signin/callback',
    },
  });
};

export const createServer = async (
  serverOptions: ServerOptions
): Promise<express.Express> => {
  const app = express();
  const handler = await getHandler();
  app.use((req, res, next) => {
    // Pass ServerOptions as request locals.
    handler(req, res, next, {
      ctx: null,
      serverOptions,
      session: null,
      user: null,
    });
  });
  app.use(express.static(path.join(getDirname(), './dist/client')));

  return app;
};

const getDirname = () => {
  const filePath = fileURLToPath(import.meta.url);
  return dirname(filePath);
};

const getHandler = async () => {
  // @ts-ignore
  const { handler } = await import('./dist/server/entry.mjs');
  return handler;
};
