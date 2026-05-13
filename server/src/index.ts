import { applicationModule, databaseModule, socketModule } from './modules';
import { getEnvVariable } from './env';
import { BaseError } from './shared';
import listEndpoints from 'express-list-endpoints';

export const startServer = async () => {
  const PORT: number = Number(getEnvVariable('PORT') ?? '');
  if (!PORT) {
    throw new BaseError('Port not specified, create variable PORT in .env (see .env.example)');
  }

  const MONGO_DB_URI: string = getEnvVariable('MONGO_DB_URI') ?? '';
  if (!MONGO_DB_URI) {
    throw new BaseError('MongoDB URI not specified, create variable MONGO_DB_URI in .env (see .env.example)');
  }

  const app = applicationModule(['http://localhost:3000']);
  const { server } = socketModule(app, ['http://localhost:3000']);

  // DB connection
  await databaseModule(MONGO_DB_URI);

  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
    console.log(listEndpoints(app));
  });
};

startServer();
