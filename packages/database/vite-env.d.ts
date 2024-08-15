import { type ConnectionDetails } from './src/clients/test-containers';

declare module 'vitest' {
  export interface ProvidedContext {
    postgresConnectionDetails: ConnectionDetails;
  }
}
