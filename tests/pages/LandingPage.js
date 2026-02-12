export class LandingPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('http://localhost:5173');
  }

  async signup(username, email, password) {
    await this.page.getByTitle('User panel').click();
    await this.page.getByRole('button', { name: 'Create account' }).click();
    await this.page.getByLabel('Username').fill(username);
    await this.page.locator('input#email-signup').fill(email);
    await this.page.locator('input#password-signup').fill(password);
    await this.page.getByRole('button', { name: 'Create account' }).click();
    // Solo cuando aparece este elemento, estamos seguros que la sesion esta iniciada. Sin embargo
    // no solo quiero probar cuando funciona si no tambien cuando falla, con lo cual debi comentarlo
    // await this.page.getByTestId('profile-link').waitFor();
  }

  async login(email, password) {
    await this.page.getByTitle('User panel').click();
    await this.page.locator('input#email-login').fill(email);
    await this.page.locator('input#password-login').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
    // Solo cuando aparece este elemento, estamos seguros que la sesion esta iniciada
    // await this.page.getByTestId('profile-link').waitFor();
  }

  async logout() {
    const userPanelButton = this.page.getByTitle('User panel');
    await userPanelButton.click();
    const logoutButton = this.page.getByRole('button', { name: 'Log out' });
    await logoutButton.click();
  }
}
