import {
  type ConnectionDetails,
  type globalSetupKey,
} from './src/clients/test-containers';

declare module 'vitest' {
  export interface ProvidedContext {
    postgresConnectionDetails: ConnectionDetails;
  }
}
