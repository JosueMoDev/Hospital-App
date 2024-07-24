import { createLogger, format, transports, config, level } from 'winston';
import { DateFnsAdapter } from './date-fns.adapter';
const { combine, timestamp, printf, colorize } = format;

const logFormat = printf(({ level, message }) => {
  return `[\x1b[33m${DateFnsAdapter.formatedDateTime()}\x1b[0m]-[${level}]:${message}`;
});
const logger = createLogger({
  format: combine(timestamp(), colorize(), logFormat),
  transports: [
    new transports.Console(),
    // new transports.File({ filename: "error.log", level: "error" }), // Log de errores a archivo
    // new transports.File({ filename: "combined.log" }), // Log combinado a archivo
  ],
});

export default logger;
