import { Construct } from 'constructs';
// @ts-ignore: Ignore the module not found error
import { DataAwsSsmParameter } from '../../.gen/providers/aws/data-aws-ssm-parameter';

export const getSecret = (scope: Construct, name: string) => {
  const parameter = new DataAwsSsmParameter(scope, name, {
    name,
  });
  return parameter.value;
};
