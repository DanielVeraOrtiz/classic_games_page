import { test, expect } from '../fixtures/index';
import { LandingPage } from '../pages/LandingPage';
import buildUser from '../utils/buildUser';
import isTokenInLocalStorage from '../utils/isTokenInLocalStorage';

// Esto usa workers que dan un comportamiento paralelo, por lo que beforeEach o beforeAll para resetear
// la base de datos da problemas, debido a que estan concurriendo operaciones a la bdd. Por lo tanto,
// estas operaciones basicas de resetear la bdd y poblarla con lo minimo para probar selo dejaremos
// a rutas del backend que solo funcionan en test y al globalSetup que se puede colocar en la configuracion
// de playwright.

let landingPage;

test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page);
  await landingPage.goto();
});

test.describe('Signup flow', () => {
  test('User can sign up with valid credentials', async ({ page }) => {
    const email = `user_${Date.now()}@test.com`;
    const user = buildUser({ email: email });
    await landingPage.signup(user.username, user.email, user.password);
    await expect(page.getByTestId('profile-link')).toBeVisible();
    await expect.poll(() => isTokenInLocalStorage(page)).toBe(true);
  });

  test("User can't sign up with invalid username", async ({ page }) => {
    const email = `user_${Date.now()}@test.com`;
    const user = buildUser({ username: 'NoAlphanumeric#', email: email });
    await landingPage.signup(user.username, user.email, user.password);
    await expect(page.getByTestId('error-signup')).toBeVisible();
    await expect.poll(() => isTokenInLocalStorage(page)).toBe(false);
  });

  test("User can't sign up with invalid password (without letter, numbers and special chr)", async ({
    page,
  }) => {
    const email = `user_${Date.now()}@test.com`;
    const user = buildUser({ email: email, password: 'Invalid' });
    await landingPage.signup(user.username, user.email, user.password);
    await expect(page.getByTestId('error-signup')).toBeVisible();

    await expect.poll(() => isTokenInLocalStorage(page)).toBe(false);
  });
});

test.describe('Login flow', () => {
  test('User can log in with valid credentials', async ({ page, user }) => {
    await landingPage.login(user.email, user.password);
    await expect(page.getByTestId('profile-link')).toBeVisible();

    await expect.poll(() => isTokenInLocalStorage(page)).toBe(true);
  });

  test("User can't login with invalid credential", async ({ page }) => {
    const user = buildUser({ email: 'random@email.com', password: 'Invalid' });
    await landingPage.login(user.email, user.password);
    await expect(page.getByTestId('profile-link')).toBeHidden();
    await expect(page.getByTestId('error-login')).toBeVisible();

    await expect.poll(() => isTokenInLocalStorage(page)).toBe(false);
  });
});

test.describe('Log out flow', () => {
  // Tenia problemas con el login, que apretaba de inmediato despues del login el User Panel y
  // todavia no cargaban todos los cambios correspondientes al inicio de sesion.
  test('User can log out successfully', async ({ page, user }) => {
    await landingPage.login(user.email, user.password);
    await expect(page.getByTestId('profile-link')).toBeVisible();
    await landingPage.logout();

    await expect(page.getByTestId('profile-link')).toBeHidden();
    await expect(page.getByTitle('User panel')).toHaveText('Login');

    await expect.poll(() => isTokenInLocalStorage(page)).toBe(false);
  });
});
