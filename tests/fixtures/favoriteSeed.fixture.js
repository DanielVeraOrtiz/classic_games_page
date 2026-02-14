import { test as base } from './game.fixture.js';

export const test = base.extend({
  favoriteSeed: async ({ request, user, game }, run) => {
    const data = { userId: user.id, gameId: game.id };
    const headers = { 'x-test-token': 'TEST' };
    const response = await request.post('http://localhost:3000/api/test/favorites', {
      headers,
      data,
    });
    const favoriteSeed = await response.json();

    await run(favoriteSeed);

    await request.delete(`http://localhost:3000/api/test/favorites/${favoriteSeed.id}`, {
      headers,
    });
  },
});
