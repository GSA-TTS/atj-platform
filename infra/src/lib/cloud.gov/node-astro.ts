import { Construct } from 'constructs';
import * as cloudfoundry from '../../../.gen/providers/cloudfoundry';

export class AstroService extends Construct {
  constructor(scope: Construct, id: string, spaceId: string) {
    super(scope, id);

    const domain =
      new cloudfoundry.dataCloudfoundryDomain.DataCloudfoundryDomain(
        scope,
        `${id}-data-domain`,
        {
          name: 'app.cloud.gov',
        }
      );

    const route = new cloudfoundry.route.Route(scope, `${id}-route`, {
      domain: domain.id,
      space: spaceId,
      hostname: id,
    });

    new cloudfoundry.app.App(this, `${id}-app`, {
      name: `${id}-app`,
      space: spaceId,
      //dockerImage: 'ghcr.io/gsa-tts/tts-10x-atj-dev/doj-demo:latest',
      dockerImage: 'ghcr.io/gsa-tts/atj-platform/doj-demo:main',
      memory: 1024,
      diskQuota: 4096,
      healthCheckType: 'http',
      healthCheckHttpEndpoint: '/',
      routes: [
        {
          route: route.id,
        },
      ],
    });
  }
}
