module.exports = {
  // database: "doarte",
  // user: "doarte",
  // password: "doarte",
  // host: "localhost",
  // dialect: "postgres",
  // pool: {
  //   max: 5,
  //   min: 0,
  //   acquire: 30000,
  //   idle: 10000
  // }

  development: {
    database: "doarte",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    database: "doarte",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    use_env_variable: "DATABASE_URL",
  },
};
