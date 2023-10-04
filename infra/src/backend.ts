import { S3Backend, TerraformStack } from 'cdktf';

export const withBackend = (stack: TerraformStack, stackPrefix: string) =>
  new S3Backend(stack, {
    bucket: 'atj-tfstate',
    key: `${stackPrefix}.tfstate`,
    region: 'us-east-2',
  });
