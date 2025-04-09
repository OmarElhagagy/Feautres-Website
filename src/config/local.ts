export default {
  port: process.env.PORT || 5000,
  dbUrl: process.env.DATABASE_URL || 'postgresql://postgres:omaradel@localhost:5432/feat?schema=public',
  jwt: process.env.JWT_SECRET || 'local-secret',
};
