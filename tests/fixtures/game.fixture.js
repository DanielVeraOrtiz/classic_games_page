import { test as base } from './user.fixture.js';

export const test = base.extend({
  game: async ({ request }, run, testInfo) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const testToken = import.meta.env.VITE_TEST_TOKEN;
    const data = { workId: testInfo.workerIndex };
    const headers = { 'x-test-token': testToken };
    const response = await request.post(`${backendUrl}/api/test/games`, { headers, data });
    const game = await response.json();

    await run(game);

    await request.delete(`${backendUrl}/api/test/games/${game.id}`, { headers });
  },
});
