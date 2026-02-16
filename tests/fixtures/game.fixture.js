import { test as base } from './user.fixture.js';

export const test = base.extend({
  game: async ({ request }, run, testInfo) => {
    const data = { workId: testInfo.workerIndex };
    const headers = { 'x-test-token': 'TEST' };
    const response = await request.post('http://localhost:3000/api/test/games', { headers, data });
    const game = await response.json();

    await run(game);

    await request.delete(`http://localhost:3000/api/test/games/${game.id}`, { headers });
  },
});
