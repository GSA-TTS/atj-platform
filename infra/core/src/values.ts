export type DeployEnv = 'dev' | 'staging';

const getPathPrefix = (env: DeployEnv) => `/tts-10x-atj-${env}`;

export const getAppLoginGovKeys = (env: DeployEnv, appKey: string) => {
  const prefix = getPathPrefix(env);
  return {
    privateKey: `${prefix}/${appKey}/login.gov/private-key`,
    publicKey: `${prefix}/${appKey}/login.gov/public-key`,
  };
};
