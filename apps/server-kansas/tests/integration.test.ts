import request from 'supertest';
import { describe, expect, test } from 'vitest';

import { createInMemoryDatabaseContext } from '@atj/database';
import { createCustomServer } from '../src/server';

describe('Kansas State Courts Form Service', () => {
  test.fails('renders the home page', async () => {
    const db = await createInMemoryDatabaseContext();
    const app = await createCustomServer(db);
    const response = await request(app).get('/');
    expect(response.ok).toBe(true);
    expect(response.text).toMatch(/DOJ Form Service/);
  });
});
