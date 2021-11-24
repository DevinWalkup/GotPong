module.exports = {
  "type": "postgres",
  "host": process.env.DB_HOST,
  "port": process.env.DB_PORT,
  "username": process.env.DB_USER,
  "password": process.env.DB_PASS,
  "database": process.env.DB_NAME,
  "synchronize": true,
  "logging": false,
  "entities": ["server/database/models/**/*.ts"],
  "migrations": ["server/database/migrations/**/*.ts"],
  "subscribers": ["server/database/subscriber/**/*.ts"],
  "cli": {
    "entitiesDir": "server/database/models",
    "migrationsDir": "server/database/migrations",
    "subscribersDir": "server/database/subscriber"
  }
};
