import { test as base } from '@playwright/test';

// Simulación de funciones backend
async function createUser(email) {
  return { id: crypto.randomUUID(), email };
}

// Se cambia nombre, de use a run, para que no tenga problema el ESLint creyendo que es hook de React
export const test = base.extend({
  user: [
    async (_, run, testInfo) => {
      const email = `user-${testInfo.workerIndex}-${Date.now()}@test.com`;

      const user = await createUser(email);

      await run(user);
    },
    { scope: 'worker' },
  ],
});
