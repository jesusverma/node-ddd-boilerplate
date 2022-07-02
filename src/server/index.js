const express = require('express')

module.exports = ({ config, router, logger }) => {
  const app = express()

  app.disable('x-powered-by')
  app.use(router)

  return {
    app,
    start: () =>
      new Promise((resolve) => {
        const http = app.listen(config.server.port, () => {
          const { port } = http.address()
          logger.info('I am Groot')
          logger.info(`[p ${process.pid}] Listening at port ${port}`)
          resolve(http)
        })
      }),
  }
}
