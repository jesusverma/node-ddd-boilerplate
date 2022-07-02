const DB = require('./db_func')

module.exports = ({ config, logger }) => {
  if (!config.mysqlConfig) {
    logger.error('Database config file log not found, disabling database.')
    process.exit(1)
  }

  const db = DB(config.mysqlConfig, logger)

  return db
}

//TODO: check if DB is connected or not. Don't start server if db is not connected.
