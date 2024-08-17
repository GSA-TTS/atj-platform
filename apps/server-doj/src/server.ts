import { join } from 'path';
import {
  type DatabaseContext,
  createDatabaseGateway,
  createFilesystemDatabaseContext,
} from '@atj/database';
import { createServer } from '@atj/server';

//const getDirname = () => dirname(fileURLToPath(import.meta.url));

const createDevDatabase = async () => {
  return createFilesystemDatabaseContext(join(__dirname, '../doj.db'));
};

export const createCustomServer = async (ctx: {
  db: DatabaseContext;
}): Promise<any> => {
  const db = createDatabaseGateway(ctx.db || createDevDatabase());

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
