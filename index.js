const container = require('src/container')
const app = container.resolve('app')
let server = null

app
  .start()
  .then((_server) => {
    server = _server
  })
  .catch((error) => {
    app.logger.error(error)
    process.exit()
  })
