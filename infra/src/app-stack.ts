import { App, TerraformStack } from 'cdktf';
import { Construct } from 'constructs';
import { CloudfoundryProvider } from '../.gen/providers/cloudfoundry/provider';

import { withBackend } from './backend';
import { CloudGovSpace } from './cloud.gov/space';

export const registerAppStack = (stackPrefix: string) => {
  const app = new App();
  const stack = new AppStack(app, stackPrefix);
  withBackend(stack, stackPrefix);
  app.synth();
};

class AppStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    /*new AwsProvider(this, 'AWS', {
      region: 'us-east-2',
    });*/

    new CloudfoundryProvider(this, 'cloud-gov', {
      apiUrl: 'https://api.fr.cloud.gov',
      appLogsMax: 30,
      ssoPasscode: '',
    });

    //new Docassemble(this, `${id}-docassemble`);
    new CloudGovSpace(this, id);
    //new FormService(this, `${id}-rest-api`);
  }
}
