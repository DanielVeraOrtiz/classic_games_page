export default function isTokenInLocalStorage(page) {
  return page.evaluate(() => localStorage.getItem('token') !== null);
}
