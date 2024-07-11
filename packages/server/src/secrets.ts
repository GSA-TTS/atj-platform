export type ServerSecrets = {
  loginGov: {
    //clientId: string;
    clientSecret: string;
  };
};

export const getServerSecrets = (env: ImportMetaEnv) => {
  return {
    //clientId: 'urn:gov:gsa:openidconnect.profiles:sp:sso:gsa:tts-10x-atj-dev-server-doj',
    clientSecret: (import.meta as any).env.SECRET_LOGIN_GOV_PRIVATE_KEY,
  };
};
