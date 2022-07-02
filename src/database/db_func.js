const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const SequelizeAuto = require('sequelize-auto')
const { Transaction } = require('sequelize')

// TODO: DB Config Validation
module.exports = (config, logger) => {
  if (config.options.logging) {
    config.options.logging = (msg) => logger.debug(msg)
    config.options.logQueryParameters = true
  }

  const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config.options,
  )

  const db = {
    sequelize,
    Sequelize,
    models: {},
    connect: async () => {
      logger.info('Initializing Database ...', config.database)
      return await sequelize
        .authenticate()
        .then(() => logger.info('Successfully connected to Database'))
        .catch((error) => {
          logger.error('Error while connecting to Database')
          throw error
        })
    },
    transaction: async () => {
      return await sequelize.transaction()
    },
  }

  config.options.logging = false
  const options = Object.assign(
    { directory: path.resolve('src/database/models') },
    config.modelOptions,
    config.options,
  )

  Promise.all(
    fs.readdirSync(options.directory).map((filename) => {
      if (filename !== '_associations.js' && filename.endsWith('.js')) {
        let filepath = options.directory + '/' + filename

        let model = require(filepath)(sequelize, Sequelize.DataTypes)
        db.models[model.name] = model

        if (!model) {
          throw new Error(`Failed to import model ${filename}`)
        }
      }
    }),
  ).catch((error) => {
    logger.error(error)
    return
  })
  // });

  return db
}
