/// <reference types="astro/client" />

// Define properties on the `Locals` interface so we can pass application
// context data from the concrete site configuration to Astro via middleware.
// @see ./context.ts@getAppContext
namespace App {
  interface Locals {
    // User-provided server configuration. Will be undefined when running in
    // dev mode.
    serverOptions?: import('./context').ServerOptions;

    // Lazy-loaded app context, derived from `serverOptions` and the Astro
    // global context, via getAstroAppContext().
    ctx?: AppContext | null;

    // Auth types from Lucia
    session: import('@atj/auth').Session | null;
    user: import('@atj/auth').User | null;
  }
}
