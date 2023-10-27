import { App, TerraformStack } from 'cdktf';
import { Construct } from 'constructs';
import { AwsProvider } from '@cdktf/provider-aws/lib/provider';

import { withBackend } from './backend';
import { Docassemble } from './docassemble';
import { FormService } from './form-service';

export const registerAppStack = (stackPrefix: string) => {
  const app = new App();
  const stack = new AppStack(app, stackPrefix);
  withBackend(stack, stackPrefix);
  app.synth();
};

class AppStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new AwsProvider(this, 'AWS', {
      region: 'us-east-2',
    });

    new Docassemble(this, `${id}-docassemble`);
    new FormService(this, `${id}-form-service`);
  }
}
