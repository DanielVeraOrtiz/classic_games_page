import { test as base } from '@playwright/test';

// Se cambia nombre, de use a run, para que no tenga problema el ESLint creyendo que es hook de React
export const test = base.extend({
  user: async ({ request }, run) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const testToken = import.meta.env.VITE_TEST_TOKEN;
    const headers = { 'x-test-token': testToken };
    const response = await request.post(`${backendUrl}/api/test/users`, { headers });
    const user = await response.json();

    await run(user);

    await request.delete(`${backendUrl}/api/test/users/${user.id}`, { headers });
  },
});
