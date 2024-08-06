import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const getDirname = () => dirname(fileURLToPath(import.meta.url));

export const createCustomServer = async (): Promise<any> => {
  const { createDevDatabaseContext, createDatabaseService } = await import(
    '@atj/database'
  );
  const { createServer } = await import('@atj/server');

  const dbCtx = await createDevDatabaseContext(
    path.join(getDirname(), '../doj.db')
  );
  const database = createDatabaseService(dbCtx);

  return createServer({
    title: 'KS Courts Form Service',
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
