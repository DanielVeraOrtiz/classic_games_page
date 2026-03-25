import { request } from '@playwright/test';

export default async () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const testToken = import.meta.env.VITE_TEST_TOKEN;
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
