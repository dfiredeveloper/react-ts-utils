module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
      '^.+\\.[jt]sx?$': 'babel-jest', // This line ensures both .js and .jsx/.ts and .tsx files are transformed
    },
    testRegex: '/test/.*\\.(test|spec)?\\.(ts|tsx|js|jsx)$',
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json',
      },
    },
    transformIgnorePatterns: ['/node_modules/'],
  };
  