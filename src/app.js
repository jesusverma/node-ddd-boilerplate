module.exports = ({ server, database, config, logger }) => {
  return {
    logger: logger,
    start: () => Promise.resolve().then(database.connect).then(server.start),
  }
}
