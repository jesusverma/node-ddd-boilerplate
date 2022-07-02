const Express = require('express')
const ExpressStatusMonitor = require('express-status-monitor')
const CookieParser = require('cookie-parser')
const Compression = require('compression')
const ExpressPromBundle = require('express-prom-bundle')
const HealthCheck = require('../../assembler/HealthCheck')

const cors = require('cors')
const { BAD_GATEWAY, OK } = require('http-status')

module.exports = ({ config, repository }) => {
  const app = Express.Router()

  if (config.environment === 'dev') {
    app.use(ExpressStatusMonitor())
  }

  app
    .use(Express.json())
    .use(Compression())
    .use(CookieParser())
    .use(Express.urlencoded({ extended: true }))
    .use(cors())
    .use(
      ExpressPromBundle({
        includeMethod: true,
        includePath: true,
        urlValueParser: {
          extraMasks: [
            /^[a-zA-Z]{3}\-[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[4][0-9a-fA-F]{3}\-[89abAB][0-9a-fA-F]{3}\-[0-9a-fA-F]{12}$/, // FTEID
          ],
        },
        promClient: {
          collectDefaultMetrics: {
            timeout: 1000,
          },
        },
      }),
    )

  app.get('/healthz/liveness', function health(req, res) {
    res.status(OK).send()
  })

  app.get('/', function health(req, res) {
    res.status(OK).send()
  })

  app.get('/healthz/readiness', async function health(req, res) {
    try {
      await HealthCheck(repository)
      res.status(OK).send()
    } catch {
      res.status(BAD_GATEWAY).send()
    }
  })
  return app
}
