import bunyan, { LogLevel } from 'bunyan';

export const logger = bunyan.createLogger({
  name: 'influx_server',
  streams: [
    {
      stream: process.stdout,
      level: (process.env.LOG_LEVEL || 'info') as LogLevel,
    },
  ],
});

logger.info('influx_server logger started');
