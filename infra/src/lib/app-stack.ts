import { App, TerraformStack } from 'cdktf';
import { Construct } from 'constructs';

import { AwsProvider } from '../../.gen/providers/aws/provider';
import { CloudfoundryProvider } from '../../.gen/providers/cloudfoundry/provider';

import { withBackend } from './backend';
import { CloudGovSpace } from './cloud.gov/space';
import { DataAwsSsmParameter } from '../../.gen/providers/aws/data-aws-ssm-parameter';

export const registerAppStack = (stackPrefix: string, deployEnv: string) => {
  const app = new App();
  const stack = new AppStack(app, stackPrefix, deployEnv);
  withBackend(stack, stackPrefix);
  app.synth();
};

class AppStack extends TerraformStack {
  constructor(scope: Construct, id: string, deployEnv: string) {
    super(scope, id);

    new AwsProvider(this, 'AWS', {
      region: 'us-east-2',
    });

    const cfUsername = new DataAwsSsmParameter(
      this,
      `${id}-cloudfoundry-username`,
      {
        name: `/${id}/cloudfoundry/username`,
      }
    );
    const cfPassword = new DataAwsSsmParameter(
      this,
      `${id}-cloudfoundry-password`,
      {
        name: `/${id}/cloudfoundry/password`,
      }
    );

    new CloudfoundryProvider(this, 'cloud-gov', {
      apiUrl: 'https://api.fr.cloud.gov',
      appLogsMax: 30,
      user: cfUsername.value,
      password: cfPassword.value,
    });

    new CloudGovSpace(this, id, deployEnv);

    //new Docassemble(this, `${id}-docassemble`);
    //new FormService(this, `${id}-rest-api`);
  }
}
