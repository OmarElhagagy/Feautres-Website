export default {
  port: process.env.PORT || 5000,
  dbUrl: process.env.DATABASE_URL,
  jwt: process.env.JWT_SECRET,
};
