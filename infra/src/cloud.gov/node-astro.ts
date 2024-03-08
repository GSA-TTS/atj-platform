import { Construct } from 'constructs';
import * as cloudfoundry from '../../.gen/providers/cloudfoundry';

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
      //path: asset.path,
      //sourceCodeHash: asset.assetHash,
      //command: 'node ./dist/server/entry.mjs',
      //buildpack: 'nodejs_buildpack',
      dockerImage: 'cloudfoundry/test-app',
      routes: [
        {
          route: route.id,
          //port: 7777,
        },
      ],
    });
  }
}
