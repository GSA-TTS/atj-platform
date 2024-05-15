import { describe, expect, test } from 'vitest';
import { create } from 'zustand';

import { createNotificationsSlice } from './store';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

describe('Notifications store', () => {
  test('should register notification', async () => {
    const timeoutMs = 1;
    const store = create(createNotificationsSlice(timeoutMs));
    const state = store.getState();
    state.addNotification('info', 'Pattern added.');
    const notifications = store.getState().notifications;

    expect(notifications.length).toEqual(1);
    expect(typeof notifications[0].id).toEqual('string');
    expect(notifications[0].message).toEqual('Pattern added.');
    expect(notifications[0].type).toEqual('info');

    // Wait for the timeout and confirm the notification has been removed.
    await wait(timeoutMs);
    expect(store.getState().notifications.length).toEqual(0);
  });
});
