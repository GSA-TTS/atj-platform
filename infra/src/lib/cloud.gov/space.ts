import { Construct } from 'constructs';

import * as cloudfoundry from '../../../.gen/providers/cloudfoundry';
import { CLOUD_GOV_ORG_NAME } from './config';
import { AstroService } from './node-astro';

export class CloudGovSpace extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const space = new cloudfoundry.dataCloudfoundrySpace.DataCloudfoundrySpace(
      scope,
      `${id}-data-space`,
      {
        name: id,
        orgName: CLOUD_GOV_ORG_NAME,
      }
    );

    new AstroService(scope, `${id}-doj-demo`, space.id);
  }
}
