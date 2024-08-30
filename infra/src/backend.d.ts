import { S3Backend, TerraformStack } from 'cdktf';
export declare const withBackend: (stack: TerraformStack, stackPrefix: string) => S3Backend;
