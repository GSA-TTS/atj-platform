import { Construct } from 'constructs';

import * as cloudfoundry from '../../../.gen/providers/cloudfoundry';
import { CLOUD_GOV_ORG_NAME } from './config';
import { AstroService } from './node-astro';

export class CloudGovSpace extends Construct {
  constructor(scope: Construct, id: string, deployEnv: string) {
    super(scope, id);

    const space = new cloudfoundry.dataCloudfoundrySpace.DataCloudfoundrySpace(
      scope,
      `${id}-data-space`,
      {
        name: id,
        orgName: CLOUD_GOV_ORG_NAME,
      }
    );

    new AstroService(
      scope,
      `${id}-server-doj`,
      space.id,
      `server-doj:${deployEnv}`
    );
    new AstroService(
      scope,
      `${id}-server-kansas`,
      space.id,
      `server-kansas:${deployEnv}`
    );
  }
}
