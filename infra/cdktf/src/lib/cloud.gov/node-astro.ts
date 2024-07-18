import { Construct } from 'constructs';
import * as cloudfoundry from '../../../.gen/providers/cloudfoundry';

export class AstroService extends Construct {
  constructor(
    scope: Construct,
    id: string,
    spaceId: string,
    imageName: `${string}:${string}`,
    secrets: {
      loginGovPrivateKey: string;
    }
  ) {
    super(scope, id);

    const domain =
      new cloudfoundry.dataCloudfoundryDomain.DataCloudfoundryDomain(
        scope,
        `${id}-data-domain`,
        {
          name: 'app.cloud.gov',
        }
      );

    const route = new cloudfoundry.route.Route(this, `${id}-route`, {
      domain: domain.id,
      space: spaceId,
      hostname: id,
    });

    const loginGovService =
      new cloudfoundry.userProvidedService.UserProvidedService(
        this,
        `${id}-login-gov-service`,
        {
          name: `${id}-login-gov-service`,
          space: spaceId,
          credentials: {
            SECRET_LOGIN_GOV_PRIVATE_KEY: secrets.loginGovPrivateKey,
          },
        }
      );

    new cloudfoundry.app.App(this, `${id}-app`, {
      name: `${id}-app`,
      space: spaceId,
      dockerImage: `ghcr.io/gsa-tts/atj-platform/${imageName}`,
      memory: 1024,
      diskQuota: 4096,
      healthCheckType: 'http',
      healthCheckHttpEndpoint: '/',
      routes: [
        {
          route: route.id,
        },
      ],
      serviceBinding: [
        {
          serviceInstance: loginGovService.id,
        },
      ],
    });
  }
}
