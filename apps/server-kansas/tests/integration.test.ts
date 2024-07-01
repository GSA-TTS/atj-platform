import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';

import { createCustomServer } from '../src/server';

describe('Kansas State Courts Form Service', () => {
  let app: any;

  beforeAll(async () => {
    app = await createCustomServer();
  });

  test('renders the home page', async () => {
    const response = await request(app).get('/');
    expect(response.ok).toBe(true);
    expect(response.text).toMatch(/KS Courts Form Service/);
  });
});
