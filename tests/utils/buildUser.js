let counter = 1;

export default function buildUser(overrides = {}) {
  return {
    username: `user${counter}`,
    email: `user${counter++}@email.com`,
    password: 'Password1$',
    ...overrides,
  };
}
