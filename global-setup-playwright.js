import { request } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({
  path: '.env.development',
});

export default async () => {
  // eslint-disable-next-line no-undef
  const backendUrl = process.env.VITE_BACKEND_URL;
  // eslint-disable-next-line no-undef
  const testToken = process.env.VITE_TEST_TOKEN;
  const api = await request.newContext({
    baseURL: backendUrl,
  });

  await api.post('/api/test/reset-db', {
    headers: {
      'x-test-token': testToken,
    },
  });

  await api.dispose();
};
