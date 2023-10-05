import { S3Backend, TerraformStack } from 'cdktf';

export const withBackend = (stack: TerraformStack, stackPrefix: string) =>
  new S3Backend(stack, {
    bucket: '10x-atj-tfstate',
    key: `${stackPrefix}.tfstate`,
    region: 'us-east-2',
  });
