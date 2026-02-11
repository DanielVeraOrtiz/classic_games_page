import { test as base } from './user.fixture.js';

async function createGame() {
  return {
    id: crypto.randomUUID(),
    title: `Game-${Date.now()}`,
  };
}

// async function deleteGame(id) {
//   // eliminar game en DB
// }

export const test = base.extend({
  game: async (_, run) => {
    const game = await createGame();

    await run(game);

    // await deleteGame(game.id);
  },
});
