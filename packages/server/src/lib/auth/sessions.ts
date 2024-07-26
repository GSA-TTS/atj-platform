import { getServerSecrets } from '../../secrets';
import { LoginGov } from './login-gov';

const secrets = getServerSecrets((import.meta as any).env);

export const loginGov = new LoginGov({
  loginGovUrl: 'https://idp.int.identitysandbox.gov',
  clientId:
    'urn:gov:gsa:openidconnect.profiles:sp:sso:gsa:tts-10x-atj-dev-server-doj',
  clientSecret: secrets.loginGov.clientSecret,
  redirectURI: 'http://localhost:4322/login/callback',
});
