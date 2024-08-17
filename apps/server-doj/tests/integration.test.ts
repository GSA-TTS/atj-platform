import request from 'supertest';
import { describe, expect, test } from 'vitest';
import { describeDatabase } from '@atj/database/testing';

import { createCustomServer } from '../src/server';
describe('DOJ Form Service', () => {
  test('renders the home page', async () => {
    expect(true).toBe(true);
  });
});
describeDatabase('DOJ Form Service', () => {
  test('renders the home page', async ({ db }) => {
    const app = await createCustomServer({ db: db.ctx });
    const response = await request(app).get('/');
    expect(response.ok).toBe(true);
    expect(response.text).toMatch(/DOJ Form Service/);
  });
});
