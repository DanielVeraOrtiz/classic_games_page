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

  await api.post('/api/test/users', {
    headers: {
      'x-test-token': 'TEST',
    },
    data: {
      email: 'conny123@email.com',
      password: 'Password12$',
      username: 'conny',
    },
  });

  await api.dispose();
};
