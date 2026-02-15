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
    await page.getByTitle('Agregar a favoritos').nth(0).click();
    await page.getByTitle('Agregar a favoritos').nth(1).click();
    await page.reload({ waitUntil: 'networkidle' });
    await expect(page.getByRole('link', { name: game.title })).toBeVisible();
    await expect(page.getByRole('link', { name: gamesMockApi[0].title })).toBeVisible();
    await expect(page.getByRole('link', { name: gamesMockApi[1].title })).toBeVisible();
    await expect(page.locator('[data-testid="favorites-list"] li')).toHaveCount(3);
  });
});

test.describe('User can delete games from his favorite games', () => {
  test('User can have favorites and add 2 new favorites, then user can delete his new favorite', async ({
    page,
    user,
    favoriteSeed,
  }) => {
    await landingPage.login(user.email, user.password);
    await page.getByTestId('profile-link').waitFor();
    await page.getByTitle('Agregar a favoritos').nth(0).click();
    await page.getByTitle('Agregar a favoritos').nth(1).click();
    await page.reload({ waitUntil: 'networkidle' });
    await expect(page.locator('[data-testid="favorites-list"] li')).toHaveCount(3);
    await page.getByTitle('Eliminar de favoritos').nth(0).click();
    await page.getByTitle('Eliminar de favoritos').nth(1).click();
    await page.reload({ waitUntil: 'networkidle' });
    await expect(page.getByRole('link', { name: gamesMockApi[0].title })).toBeHidden();
    await expect(page.getByRole('link', { name: gamesMockApi[1].title })).toBeHidden();
    await expect(page.locator('[data-testid="favorites-list"] li')).toHaveCount(1);
  });
});

test.describe('User not authorized can`t see and click de favorite button', () => {
  test('User unauthorized can`t click favorite button', async ({ page }) => {
    await expect(page.getByTitle('Agregar a favoritos').first()).toBeHidden();
    await expect(page.getByTitle('Agregar a favoritos').last()).toBeHidden();
  });
});
