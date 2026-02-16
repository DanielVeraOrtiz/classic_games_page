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

  await page.route('**/feed.php?format=0&id=*', async (route) => {
    const url = new URL(route.request().url());
    const id = url.searchParams.get('id');
    const game = String(id) === gamesMockApi[0].id ? gamesMockApi[0] : gamesMockApi[1];

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([game]),
    });
  });

  landingPage = new LandingPage(page);

  await landingPage.goto();
});

test.describe('User can access gamePage fron his favorites or catalog', () => {
  test('User can access gamePage from his favorites', async ({ page, user }) => {
    await landingPage.login(user.email, user.password);
    await page.getByTestId('profile-link').waitFor();
    await page.getByTitle('Agregar a favoritos').first().click();
    await page.getByTitle('Eliminar de favoritos').waitFor();
    await page.reload({ waitUntil: 'networkidle' });
    await page.getByRole('link', { name: gamesMockApi[0].title }).click();
    await expect(
      page.getByRole('heading', { name: gamesMockApi[0].title, level: 1 }),
    ).toBeVisible();
    await expect(page.getByTitle('Eliminar de favoritos')).toBeVisible();
  });

  test('User not logged in can access gamePage from game catalog and can`t see favorite button', async ({
    page,
  }) => {
    await page.locator('a.card-link').filter({ hasText: gamesMockApi[0].title }).click();
    await expect(
      page.getByRole('heading', { name: gamesMockApi[0].title, level: 1 }),
    ).toBeVisible();
    await expect(page.getByTitle('Agregar a favoritos')).toBeHidden();
  });

  test('User logged in can access gamePage from game catalog and see favorite button', async ({
    page,
    user,
  }) => {
    await landingPage.login(user.email, user.password);
    await page.locator('a.card-link').filter({ hasText: gamesMockApi[0].title }).click();
    await expect(
      page.getByRole('heading', { name: gamesMockApi[0].title, level: 1 }),
    ).toBeVisible();
    await expect(page.getByTitle('Agregar a favoritos')).toBeVisible();
  });
});

test.describe('User can add to his favorite games from the gamePage', () => {
  test('User can login in Game Page an add to his favorite', async ({ page, user }) => {
    await page.locator('a.card-link').filter({ hasText: gamesMockApi[0].title }).click();
    await landingPage.login(user.email, user.password);
    await expect(page.getByTitle('Agregar a favoritos')).toBeVisible();
    await page.getByTitle('Agregar a favoritos').click();
    await page.getByTitle('Eliminar de favoritos').waitFor();
    await page.reload({ waitUntil: 'networkidle' });
    await expect(page.locator('[data-testid="favorites-list"] li')).toHaveCount(1);
    await expect(page.getByRole('link', { name: gamesMockApi[0].title })).toBeVisible();
  });

  test('User logged in can add to his favorite a game from gamePage', async ({ page, user }) => {
    await landingPage.login(user.email, user.password);
    await page.locator('a.card-link').filter({ hasText: gamesMockApi[0].title }).click();
    await page.getByRole('button', { name: 'Open menu' }).waitFor();
    await expect(page.getByTitle('Agregar a favoritos')).toBeVisible();
    await page.getByTitle('Agregar a favoritos').click();
    await page.getByTitle('Eliminar de favoritos').waitFor();
    await page.reload({ waitUntil: 'networkidle' });
    await expect(page.locator('[data-testid="favorites-list"] li')).toHaveCount(1);
    await expect(page.getByRole('link', { name: gamesMockApi[0].title })).toBeVisible();
  });

  test('User logged in can delete favorite game from gamePage', async ({ page, user }) => {
    await landingPage.login(user.email, user.password);
    await page.getByTitle('Agregar a favoritos').nth(0).click();
    await page.getByTitle('Eliminar de favoritos').waitFor();
    await page.locator('a.card-link').filter({ hasText: gamesMockApi[0].title }).click();
    await expect(page.getByTitle('Eliminar de favoritos')).toBeVisible();
    await page.getByTitle('Eliminar de favoritos').click();
    await page.getByTitle('Agregar a favoritos').waitFor();
    await page.reload({ waitUntil: 'networkidle' });
    await expect(page.locator('[data-testid="favorites-list"] li')).toHaveCount(0);
    await expect(page.getByRole('link', { name: gamesMockApi[0].title })).toBeHidden();
  });
});

test.describe('User can change games from his favorite games section in sidebar', () => {
  test('User can change games in sidebar', async ({ page, user }) => {
    await landingPage.login(user.email, user.password);
    await page.getByTestId('profile-link').waitFor();
    const firstGameCard = page.getByTestId('game-card').filter({ hasText: gamesMockApi[0].title });
    const secondGameCard = page.getByTestId('game-card').filter({ hasText: gamesMockApi[1].title });
    await firstGameCard.getByTitle('Agregar a favoritos').click();
    await secondGameCard.getByTitle('Agregar a favoritos').click();
    await firstGameCard.getByTitle('Eliminar de favoritos').waitFor();
    await secondGameCard.getByTitle('Eliminar de favoritos').waitFor();
    await page.reload({ waitUntil: 'networkidle' });
    await page.locator('a.card-link').filter({ hasText: gamesMockApi[0].title }).click();
    await page.getByRole('button', { name: 'Open menu' }).click();
    await page.getByRole('link', { name: gamesMockApi[1].title }).click();
    await expect(
      page.getByRole('heading', { name: gamesMockApi[1].title, level: 1 }),
    ).toBeVisible();
    await expect(page.getByTitle('Eliminar de favoritos')).toBeVisible();
  });
});
