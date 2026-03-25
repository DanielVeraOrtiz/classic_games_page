import { test as base } from './game.fixture.js';

export const test = base.extend({
  favoriteSeed: async ({ request, user, game }, run) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const testToken = import.meta.env.VITE_TEST_TOKEN;
    const data = { userId: user.id, gameId: game.id };
    const headers = { 'x-test-token': testToken };
    const response = await request.post(`${backendUrl}/api/test/favorites`, {
      headers,
      data,
    });
    const favoriteSeed = await response.json();

    await run(favoriteSeed);

    await request.delete(`${backendUrl}/api/test/favorites/${favoriteSeed.id}`, {
      headers,
    });
  },
});
