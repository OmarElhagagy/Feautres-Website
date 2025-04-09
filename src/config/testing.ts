export default {
  port: process.env.PORT || 5000,
  dbUrl: process.env.TEST_DATABASE_URL || 'postgresql://postgres:omaradel@localhost:5432/feat?schema=public',
  jwt: process.env.TEST_JWT_SECRET || 'test-secret',
};
