const { createContainer, asValue, asFunction } = require('awilix')

const app = require('./app')
const server = require('./server')
const router = require('./server/router')
const config = require('./server/config')
const logger = require('./server/logger')
const database = require('./database')
const repository = require('./domain/repository')
const output = require('./server/output')

const container = createContainer()

container.register({
  logger: asFunction(logger).singleton(),
  app: asFunction(app).singleton(),
  server: asFunction(server).singleton(),
  router: asFunction(router).singleton(),
  database: asFunction(database).singleton(),
  output: asFunction(output).singleton(),
  config: asValue(config),
  repository: asFunction(repository).singleton(),
})

module.exports = container
