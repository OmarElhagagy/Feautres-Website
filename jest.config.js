module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest' // Add this for JavaScript files
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(your-module-to-transform)/)' // Keep node_modules transformed
  ]
};
