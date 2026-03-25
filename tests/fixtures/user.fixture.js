import { test as base } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({
  path: '.env.development',
});

// Se cambia nombre, de use a run, para que no tenga problema el ESLint creyendo que es hook de React
export const test = base.extend({
  user: async ({ request }, run) => {
    // eslint-disable-next-line no-undef
    const backendUrl = process.env.VITE_BACKEND_URL;
    // eslint-disable-next-line no-undef
    const testToken = process.env.VITE_TEST_TOKEN;
    const headers = { 'x-test-token': testToken };
    const response = await request.post(`${backendUrl}/api/test/users`, { headers });
    const user = await response.json();

    await run(user);

    await request.delete(`${backendUrl}/api/test/users/${user.id}`, { headers });
  },
});
