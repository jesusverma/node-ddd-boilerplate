const winston = require('winston');
const { inspect } = require('util');
const DEFAULT_LEVEL = 'info';

module.exports = ({ config }) => {
  // eslint-disable-next-line new-cap
  const isPrimitive = (val) =>
    val === null || (typeof val !== 'object' && typeof val !== 'function');

  const formatWithInspect = (val) => {
    const prefix = isPrimitive(val) ? '' : ''; // prefix can be \n for json in new line, but kept null atm
    const shouldFormat = typeof val !== 'string' && typeof val !== 'function';

    return (
      prefix +
      (shouldFormat
        ? inspect(val, { depth: null, colors: true, breakLength: Infinity, compact: true })
        : val)
    );
  };

  const timestampFormat = winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' });
  return new winston.createLogger({
    level: config.logger.level || DEFAULT_LEVEL,
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.colorize(),
      timestampFormat,
      winston.format.printf((info) => {
        const msg = formatWithInspect(info.message);
        const splatArgs = info[Symbol.for('splat')] || [];
        const rest = splatArgs.map((data) => formatWithInspect(data)).join(' ');

        return `${info.timestamp} [${info.level}] - ${msg} ${rest}`;
      })
    ),
    transports: [new winston.transports.Console()],
    exitOnError: true,
    silent: false,
    prettyPrint: true
  });
};
