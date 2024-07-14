module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // Use jsdom environment for DOM-related tests
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testRegex: '/test/.*\\.(test|spec)\\.(ts|tsx)$', // Adjust as per your test file naming conventions
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  transformIgnorePatterns: ['/node_modules/'],
};
