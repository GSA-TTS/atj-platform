import { describe, expect, it, vi } from 'vitest';
import { mock } from 'vitest-mock-extended';

import { CliController } from '.';

describe('cli controller', () => {
  it('works', async () => {
    const ctx = {
      console: mock<Console>({ log: vi.fn() }),
      workspaceRoot: '.',
    };
    const app = CliController(ctx);
    await app.parseAsync(['node.js', 'dist/index.js', 'hello']);
    expect(ctx.console.log).toHaveBeenCalledWith('Hello!');
  });
});
