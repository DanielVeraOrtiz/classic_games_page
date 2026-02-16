import { test, expect } from '../fixtures/index';
import { LandingPage } from '../pages/LandingPage';
import { gamesMockApi } from '../utils/gamesRoutesMockAPI';

let landingPage;

test.beforeEach(async ({ page }) => {
  await page.route('**/feed.php?**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(gamesMockApi),
    });
  });

  landingPage = new LandingPage(page);

  await landingPage.goto();
});

test.describe('User can add and see his favorites games in sidebar', () => {
  test('User can see his favorites games added', async ({ page, user, game, favoriteSeed }) => {
    await landingPage.login(user.email, user.password);
    await expect(page.getByTestId('profile-link')).toBeVisible();
    const favorite = page.getByRole('link', { name: game.title });
    await expect(favorite).toBeVisible();
  });

  test('User can add a game to his favorites', async ({ page, user }) => {
    await landingPage.login(user.email, user.password);
    await expect(page.getByTestId('profile-link')).toBeVisible();
    await page.getByTitle('Agregar a favoritos').nth(0).click();
    await expect(page.getByTitle('Eliminar de favoritos').nth(0)).toBeVisible();
    await page.reload({ waitUntil: 'networkidle' });
    await expect(page.getByRole('link', { name: gamesMockApi[0].title })).toBeVisible();
  });

  test('User can have favorites and add 2 new favorites', async ({
    page,
    user,
    game,
    favoriteSeed,
  }) => {
    await landingPage.login(user.email, user.password);
    await page.getByTestId('profile-link').waitFor();
    const firstGameCard = page.getByTestId('game-card').filter({ hasText: gamesMockApi[0].title });
    const secondGameCard = page.getByTestId('game-card').filter({ hasText: gamesMockApi[1].title });
    await firstGameCard.getByTitle('Agregar a favoritos').click();
    await secondGameCard.getByTitle('Agregar a favoritos').click();
    await expect(firstGameCard.getByTitle('Eliminar de favoritos')).toBeVisible();
    await expect(secondGameCard.getByTitle('Eliminar de favoritos')).toBeVisible();
    await page.reload({ waitUntil: 'networkidle' });
    await expect(page.getByRole('link', { name: game.title })).toBeVisible();
    await expect(page.getByRole('link', { name: gamesMockApi[0].title })).toBeVisible();
    await expect(page.getByRole('link', { name: gamesMockApi[1].title })).toBeVisible();
    await expect(page.locator('[data-testid="favorites-list"] li')).toHaveCount(3);
  });
});

test.describe('User can delete games from his favorite games', () => {
  test('User can have favorites and add 2 new favorites, then user can delete his new favorites', async ({
    page,
    user,
    favoriteSeed,
  }) => {
    await landingPage.login(user.email, user.password);
    await page.getByTestId('profile-link').waitFor();
    const firstGameCard = page.getByTestId('game-card').filter({ hasText: gamesMockApi[0].title });
    const secondGameCard = page.getByTestId('game-card').filter({ hasText: gamesMockApi[1].title });
    await firstGameCard.getByTitle('Agregar a favoritos').click();
    await secondGameCard.getByTitle('Agregar a favoritos').click();
    await firstGameCard.getByTitle('Eliminar de favoritos').waitFor();
    await secondGameCard.getByTitle('Eliminar de favoritos').waitFor();
    await page.reload({ waitUntil: 'networkidle' });
    await expect(page.locator('[data-testid="favorites-list"] li')).toHaveCount(3);
    await firstGameCard.getByTitle('Eliminar de favoritos').click();
    await secondGameCard.getByTitle('Eliminar de favoritos').click();
    await expect(firstGameCard.getByTitle('Agregar a favoritos')).toBeVisible();
    await expect(secondGameCard.getByTitle('Agregar a favoritos')).toBeVisible();
    await page.reload({ waitUntil: 'networkidle' });
    await expect(page.getByRole('link', { name: gamesMockApi[0].title })).toBeHidden();
    await expect(page.getByRole('link', { name: gamesMockApi[1].title })).toBeHidden();
    await expect(page.locator('[data-testid="favorites-list"] li')).toHaveCount(1);
  });
});

test.describe('User not authorized can`t see and click de favorite button', () => {
  test('User unauthorized can`t click favorite button', async ({ page }) => {
    const firstGameCard = page.getByTestId('game-card').filter({ hasText: gamesMockApi[0].title });
    const secondGameCard = page.getByTestId('game-card').filter({ hasText: gamesMockApi[1].title });
    await expect(firstGameCard.getByTitle('Agregar a favoritos')).toBeHidden();
    await expect(secondGameCard.getByTitle('Agregar a favoritos')).toBeHidden();
  });
});
