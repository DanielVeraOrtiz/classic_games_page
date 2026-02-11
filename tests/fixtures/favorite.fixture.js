import { test as base } from './game.fixture.js';

async function createFavorite(userId, gameId) {
  return {
    id: crypto.randomUUID(),
    userId,
    gameId,
  };
}

// async function deleteFavorite(id) {
//   // eliminar favorite en DB
// }

export const test = base.extend({
  favorite: async ({ user, game }, run) => {
    const favorite = await createFavorite(user.id, game.id);

    await run(favorite);

    // await deleteFavorite(favorite.id);
  },
});
