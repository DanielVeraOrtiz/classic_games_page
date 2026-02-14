import { test, expect } from '../fixtures/index';
import { LandingPage } from '../pages/LandingPage';

let landingPage;

test.beforeEach(async ({ page }) => {
  await page.route('**/feed.php?**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          id: '88124',
          title: 'Cyber City Drift Racing',
          description: '...',
          instructions: '...',
          url: 'https://html5.gamemonetize.com/cybercitydrift/index.html',
          category: 'Racing',
          tags: '...',
          thumb: 'https://img.gamemonetize.com/cybercitydrift/512x384.jpg',
          width: '800',
          height: '600',
        },
        {
          id: '99231',
          title: 'Jungle Survival Expedition',
          description: '...',
          instructions: '...',
          url: 'https://html5.gamemonetize.com/junglesurvival/index.html',
          category: 'Adventure',
          tags: '...',
          thumb: 'https://img.gamemonetize.com/junglesurvival/512x384.jpg',
          width: '800',
          height: '600',
        },
      ]),
    });
  });

  landingPage = new LandingPage(page);

  await landingPage.goto(); // 🔥 IMPORTANTE: usar await
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
    await page.getByTitle('Agregar a favoritos').first().click();
    await expect(page.getByTitle('Eliminar de favoritos').first()).toBeVisible();
    await page.reload({ waitUntil: 'networkidle' });
    await expect(page.getByRole('link', { name: 'Cyber City Drift Racing'})).toBeVisible();
  });

  test('User can have favorites and add 2 new favorites', async ({ page, user, game, favoriteSeed }) => {
    await landingPage.login(user.email, user.password);
    await page.getByTestId('profile-link').waitFor();
    await page.getByTitle('Agregar a favoritos').first().click();
    await page.getByTitle('Agregar a favoritos').last().click();
    await page.reload({ waitUntil: 'networkidle'});
    await expect(page.getByRole('link', { name: game.title })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Cyber City Drift Racing'})).toBeVisible();
    await expect(page.getByRole('link', { name: 'Jungle Survival Expedition'})).toBeVisible();
    await expect(page.locator('[data-testid="favorites-list"] li')).toHaveCount(3);
  })
});

test.describe('User can delete games from his favorite games', () => {
  test('User can have favorites and add 2 new favorites, then user can delete his new favorite',
    async ({ page, user, game, favoriteSeed }) => {
    await landingPage.login(user.email, user.password);
    await page.getByTestId('profile-link').waitFor();
    await page.getByTitle('Agregar a favoritos').first().click();
    await page.getByTitle('Agregar a favoritos').last().click();
    await page.reload({ waitUntil: 'networkidle'});
    await expect(page.locator('[data-testid="favorites-list"] li')).toHaveCount(3);
    await page.getByTitle('Eliminar de favoritos').first().click();
    await page.getByTitle('Eliminar de favoritos').last().click();
    await page.reload({ waitUntil: 'networkidle' });
    await page.getByTestId('profile-link').waitFor();
    await expect(page.getByRole('link', { name: 'Cyber City Drift Racing'})).toBeHidden();
    await expect(page.getByRole('link', { name: 'Jungle Survival Expedition'})).toBeHidden();
    await expect(page.locator('[data-testid="favorites-list] li')).toHaveCount(1);
  })
})
