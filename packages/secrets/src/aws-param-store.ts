import {
  SSMClient,
  GetParameterCommand,
  GetParametersCommand,
  PutParameterCommand,
  DescribeParametersCommand,
  DescribeParametersCommandOutput,
} from '@aws-sdk/client-ssm';

import type { SecretKey, SecretMap, SecretValue, SecretsVault } from './types';

export class AWSParameterStoreSecretsVault implements SecretsVault {
  async getSecret(key: SecretKey) {
    const client = new SSMClient();

    try {
      const response = await client.send(
        new GetParameterCommand({
          Name: key,
          WithDecryption: true,
        })
      );
      return response.Parameter?.Value || '';
    } catch (error) {
      console.error('Error getting parameter:', error);
      throw error;
    }
  }

  async getSecrets(keys: SecretKey[]) {
    const client = new SSMClient();
    try {
      const response = await client.send(
        new GetParametersCommand({
          Names: keys,
          WithDecryption: true,
        })
      );
      const values: { [key: SecretKey]: SecretValue } = {};
      if (response.Parameters) {
        for (const parameter of response.Parameters) {
          if (parameter.Name && parameter.Value) {
            values[parameter.Name] = parameter.Value;
          }
        }
      }
      return values;
    } catch (error) {
      console.error('Error getting parameters:', error);
      throw error;
    }
  }

  async setSecret(key: string, value: string) {
    const client = new SSMClient();
    try {
      await client.send(
        new PutParameterCommand({
          Name: key,
          Value: value,
          Type: 'SecureString',
          Overwrite: true,
        })
      );
      console.log(`Secret "${key}" set successfully.`);
    } catch (error) {
      console.error('Error setting parameter:', error);
      throw error;
    }
  }

  async setSecrets(secrets: SecretMap) {
    const promises = Object.entries(secrets).map(([key, value]) =>
      this.setSecret(key, value)
    );
    await Promise.all(promises);
  }

  async getSecretKeys() {
    const client = new SSMClient();

    let keys: string[] = [];
    let nextToken: string | undefined;
    do {
      try {
        const response: DescribeParametersCommandOutput = await client.send(
          new DescribeParametersCommand({
            NextToken: nextToken,
            MaxResults: 50,
          })
        );
        if (response.Parameters) {
          keys.push(...response.Parameters.map(param => param.Name!));
        }
        nextToken = response.NextToken;
      } catch (error) {
        console.error('Error describing parameters:', error);
        throw error;
      }
    } while (nextToken);

    return keys;
  }
}
