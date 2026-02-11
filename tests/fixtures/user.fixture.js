import { test as base } from '@playwright/test';

// Se cambia nombre, de use a run, para que no tenga problema el ESLint creyendo que es hook de React
export const test = base.extend({
  user: async ({ request }, run) => {
    const headers = { 'x-test-token': 'TEST' };
    const response = await request.post('http://localhost:3000/api/test/users', { headers });
    const user = await response.json();

    await run(user);

    await request.delete(`http://localhost:3000/api/test/users/${user.id}`, { headers });
  },
});
