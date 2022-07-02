const Status = require('http-status')

/* istanbul ignore next */
module.exports = (err, req, res, next, logger, config, output) => {
  // eslint-disable-line no-unused-vars
  logger.error(err)
  switch (err.message) {
    case 'ValidationError':
      res.status(Status.BAD_REQUEST).json(
        output.fail({
          type: 'ValidationError',
          info: err.details,
        }),
      )
      break
    case 'NotFoundError':
      res.status(Status.NOT_FOUND).json(
        output.fail({
          type: 'NotFoundError',
          info: err.details,
        }),
      )
      break
    case 'BadRequestError':
      res.status(Status.BAD_REQUEST).json(
        output.fail({
          type: 'BadRequestError',
          info: err.details,
        }),
      )
      break
    default:
      break
  }

  const response = Object.assign(
    {
      type: 'InternalServerError',
      info: err.message,
    },
    config.environment === 'dev' && {
      stack: err.stack,
    },
  )

  res.status(Status.INTERNAL_SERVER_ERROR).json(output.fail(response))
}
