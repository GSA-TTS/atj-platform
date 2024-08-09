import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const getDirname = () => dirname(fileURLToPath(import.meta.url));

export const createCustomServer = async (): Promise<any> => {
  const { createDevDatabaseContext, createDatabaseGateway } = await import(
    '@atj/database'
  );
  const { createServer } = await import('@atj/server');

  const dbCtx = await createDevDatabaseContext(
    path.join(getDirname(), '../doj.db')
  );
  const db = createDatabaseGateway(dbCtx);

  return createServer({
    title: 'DOJ Form Service',
    db,
    loginGovOptions: {
      loginGovUrl: 'https://idp.int.identitysandbox.gov',
      clientId:
        'urn:gov:gsa:openidconnect.profiles:sp:sso:gsa:tts-10x-atj-dev-server-doj',
      //clientSecret: '', // secrets.loginGovClientSecret,
    },
  });
};

/*
const getServerSecrets = () => {
  const services = JSON.parse(process.env.VCAP_SERVICES || '{}');
  const loginClientSecret =
    services['user-provided']?.credentials?.SECRET_LOGIN_GOV_PRIVATE_KEY;
  return {
    loginGovClientSecret: loginClientSecret,
  };
};
*/
