import { test as base } from './game.fixture.js';

export const test = base.extend({
  favorite: async ({ request, user, game }, run) => {
    const data = { userId: user.id, gameId: game.id };
    const headers = { 'x-test-token': 'TEST' };
    const response = await request.post('http://localhost:3000/api/test/favorites', {
      headers,
      data,
    });
    const favorite = await response.json();

    await run(favorite);

    await request.delete(`http://localhost:3000/api/test/favorites/${favorite.id}`, { headers });
  },
});
