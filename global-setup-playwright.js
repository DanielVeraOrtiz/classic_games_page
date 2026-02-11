import { request } from '@playwright/test';

export default async () => {
  const api = await request.newContext({
    baseURL: 'http://localhost:3000',
  });

  await api.post('/api/test/reset-db', {
    headers: {
      'x-test-token': 'TEST',
    },
  });

  await api.dispose();
};
