export default {
  port: process.env.PORT || 5000,
  dbUrl: process.env.TEST_DATABASE_URL,
  jwt: process.env.TEST_JWT_SECRET,
};
