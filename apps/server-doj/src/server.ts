import {
  createDatabaseGateway,
  createPostgresDatabaseContext,
} from '@atj/database';
import { createServer } from '@atj/server';

export const createCustomServer = async (ctx: {
  dbUri: string;
}): Promise<any> => {
  const db = createDatabaseGateway(
    await createPostgresDatabaseContext(ctx.dbUri)
  );

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
