const morgan = require('morgan');

module.exports = (logger) => {
  return morgan('combined', {
    stream: {
      write: (message) => {
        logger.info(message.slice(0, -1));
      }
    }
  });
};
