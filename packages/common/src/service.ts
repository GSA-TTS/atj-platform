type ServiceFunction<Args extends any[], Return, Context> = (
  context: Context,
  ...args: Args
) => Return;

type ServiceFunctions<Context> = {
  [key: string]: ServiceFunction<any[], any, Context>;
};

type WithoutFirstArg<F> = F extends (context: any, ...args: infer P) => infer R
  ? (...args: P) => R
  : never;

type Service<
  Context extends any,
  Functions extends ServiceFunctions<Context>,
> = {
  [K in keyof Functions]: WithoutFirstArg<Functions[K]>;
} & { getContext: () => Context };

export const createService = <
  Context extends any,
  Functions extends ServiceFunctions<Context>,
>(
  ctx: Context,
  serviceFunctions: Functions
): Service<Context, Functions> => {
  const handler: ProxyHandler<Functions> = {
    get(target: Functions, prop: string | symbol) {
      if (prop === 'getContext') {
        return () => ctx;
      }
      const propKey = prop as keyof Functions;
      const originalFn = target[propKey];
      return (...args: any[]) =>
        (originalFn as Function).call(null, ctx, ...args);
    },
  };

  return new Proxy(serviceFunctions, handler) as unknown as Service<
    Context,
    Functions
  >;
};
