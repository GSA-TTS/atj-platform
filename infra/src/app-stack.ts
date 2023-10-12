import { App, TerraformOutput, TerraformStack } from 'cdktf';
import { Construct } from 'constructs';
import { AwsProvider } from '@cdktf/provider-aws/lib/provider';

import { withBackend } from './backend';
import { LightsailInstance } from '@cdktf/provider-aws/lib/lightsail-instance';
import { LightsailStaticIp } from '@cdktf/provider-aws/lib/lightsail-static-ip';
import { LightsailInstancePublicPorts } from '@cdktf/provider-aws/lib/lightsail-instance-public-ports';
import { LightsailStaticIpAttachment } from '@cdktf/provider-aws/lib/lightsail-static-ip-attachment';

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

    const lightsailInstance = new LightsailInstance(
      this,
      'docassemble_lightsail',
      {
        name: `${id}-docassemble`,
        availabilityZone: 'us-east-2a',
        blueprintId: 'amazon_linux_2',
        bundleId: 'medium_2_0',
        // Preliminary logic to spin up a configured docassemble instance:
        userData: USER_DATA_COMMAND,
      }
    );
    const staticIp = new LightsailStaticIp(
      this,
      'docassemble_lightsail_static_ip',
      {
        name: `${id}-docassemble-static-ip`,
      }
    );
    new LightsailStaticIpAttachment(this, 'test_2', {
      instanceName: lightsailInstance.id,
      staticIpName: staticIp.name,
    });
    new LightsailInstancePublicPorts(
      this,
      `docassemble_lightsail_public_ports`,
      {
        instanceName: lightsailInstance.name,
        portInfo: [
          {
            fromPort: 80,
            protocol: 'tcp',
            toPort: 80,
          },
          {
            fromPort: 443,
            protocol: 'tcp',
            toPort: 443,
          },
          {
            fromPort: 22,
            protocol: 'tcp',
            toPort: 22,
          },
        ],
      }
    );

    new TerraformOutput(this, 'docassemble_ip_address', {
      value: staticIp.ipAddress,
    });
  }
}

const USER_DATA_COMMAND = `
sudo yum -y update && \
sudo yum -y install docker && \
sudo systemctl enable docker && \
sudo systemctl start docker && \
sudo usermod -a -G docker ec2-user && \
echo "DAHOSTNAME=docassemble.atj.10x.gov
TIMEZONE=America/New_York
USEHTTPS=true
USELETSENCRYPT=true
LETSENCRYPTEMAIL=daniel.naab@gsa.gov" > /home/ec2-user/env.list && \
sudo chown ec2-user:ec2-user /home/ec2-user/env.list && \
sudo docker run -d \
  --env-file /home/ec2-user/env.list \
  --volume dabackup:/usr/share/docassemble/backup \
  --publish 80:80 \
  --publish 443:443 \
  --stop-timeout 600 \
  jhpyle/docassemble
`;
