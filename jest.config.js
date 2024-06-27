module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '/test/.*\\.(test|spec)?\\.(ts|tsx|js)$',
  };
  