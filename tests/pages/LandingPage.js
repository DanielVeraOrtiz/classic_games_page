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
  }

  async login(email, password) {
    await this.page.getByTitle('User panel').click();
    await this.page.locator('input#email-login').fill(email);
    await this.page.locator('input#password-login').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async logout() {
    await this.page.getByTitle('User panel').click();
    await this.page.getByRole('button', { name: 'Log out' }).click();
  }
}
