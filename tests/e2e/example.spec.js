// @ts-check
import { test, expect } from '../fixtures/index';
import { LandingPage } from '../pages/LandingPage';

// Esto usa workers que dan un comportamiento paralelo, por lo que beforeEach o beforeAll para resetear
// la base de datos da problemas, debido a que estan concurriendo operaciones a la bdd. Por lo tanto,
// estas operaciones basicas de resetear la bdd y poblarla con lo minimo para probar selo dejaremos
// a rutas del backend que solo funcionan en test y al globalSetup que se puede colocar en la configuracion
// de playwright.

test.describe('test auth operation. example: signin, login, logout', () => {
  test('Con los datos correctos se crea una cuenta bien', async ({ page }) => {
    const landingPage = new LandingPage(page);
    await landingPage.goto();
    await landingPage.signup('conny', 'conny12345@email.com', 'Password12$');
    const userProfile = page.getByRole('link', { name: 'Go to my profile' });
    await expect(userProfile).toBeVisible();
  });

  test('Con los datos correctos se inicia sesion bien', async ({ page, user }) => {
    console.log(favorite);
    const landingPage = new LandingPage(page);
    await landingPage.goto();
    await landingPage.login(user.email, user.password);
    const userProfile = page.getByRole('link', { name: 'Go to my profile' });
    await expect(userProfile).toBeVisible();
  });
});
