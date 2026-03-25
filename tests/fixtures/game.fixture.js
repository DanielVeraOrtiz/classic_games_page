import { test as base } from './user.fixture.js';
import dotenv from 'dotenv';

dotenv.config({
  path: '.env.development',
});

export const test = base.extend({
  game: async ({ request }, run, testInfo) => {
    // eslint-disable-next-line no-undef
    const backendUrl = process.env.VITE_BACKEND_URL;
    // eslint-disable-next-line no-undef
    const testToken = process.env.VITE_TEST_TOKEN;
    const data = { workId: testInfo.workerIndex };
    const headers = { 'x-test-token': testToken };
    const response = await request.post(`${backendUrl}/api/test/games`, { headers, data });
    const game = await response.json();

    await run(game);

    await request.delete(`${backendUrl}/api/test/games/${game.id}`, { headers });
  },
});
