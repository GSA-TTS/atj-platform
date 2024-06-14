import { App } from 'cdktf';

const app = new App();

const deployEnv = process.env.DEPLOY_ENV;

switch (deployEnv) {
  case 'dev':
    import('./spaces/main');
    break;
  case 'staging':
    import('./spaces/staging');
    break;
  default:
    throw new Error('Please specify a valid environment');
}

app.synth();
