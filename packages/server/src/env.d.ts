/// <reference types="astro/client" />

// Define properties on the `Locals` interface so we can pass application
// context data from the concrete site configuration to Astro via middleware.
// See: ./middleware.ts
namespace App {
  interface Locals {
    // User-provided server configuration.
    serverOptions: import('./context').ServerOptions;

    // Lazy-loaded app context, derived from `serverOptions`.
    ctx?: AppContext;
  }
}
