import { defineConfig } from 'auth-astro';

export default defineConfig({
  providers: [
    /**
     * https://dashboard.int.identitysandbox.gov/service_providers/5237
     * urn:gov:gsa:openidconnect.profiles:sp:sso:gsa:tts-10x-atj-dev-server-doj
     */
    {
      id: 'login-gov',
      name: 'Login.gov',
      type: 'oidc',
      checks: ['pkce', 'state', 'nonce'],
      authorization: {
        params: {
          //scope: 'profile openid email address phone',
          acr_values: ['http://idmanagement.gov/ns/assurance/ial/1'],
        },
      },
      issuer: 'https://idp.int.identitysandbox.gov',
      clientId:
        'urn:gov:gsa:openidconnect.profiles:sp:sso:gsa:tts-10x-atj-dev-server-doj',
      clientSecret: (import.meta as any).env.SECRET_LOGIN_GOV_PRIVATE_KEY,
    },
  ],
});
