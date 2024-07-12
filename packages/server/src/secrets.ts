export type ServerSecrets = {
  authSecret: string;
  loginGov: {
    //clientId: string;
    clientSecret: string;
  };
};

export const getServerSecrets = (env: ImportMetaEnv): ServerSecrets => {
  throw new Error(`auth secret: ${env.AUTH_SECRET}`);
  return {
    loginGov: {
      //clientId: 'urn:gov:gsa:openidconnect.profiles:sp:sso:gsa:tts-10x-atj-dev-server-doj',
      clientSecret: env.SECRET_LOGIN_GOV_PRIVATE_KEY,
    },
    authSecret: env.AUTH_SECRET,
  };
};
