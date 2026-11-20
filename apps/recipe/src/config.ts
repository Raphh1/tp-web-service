import { env, loadEnvFile } from '@recipes/config';

loadEnvFile();

export const config = {
  grpcUrl: `0.0.0.0:${env('RECIPE_GRPC_PORT', '50052')}`,
  /** In dev mode, follows the port published by Compose (RECIPE_DB_PORT) */
  mongoUrl: env(
    'RECIPE_DB_URL',
    `mongodb://localhost:${env('RECIPE_DB_PORT', '27019')}`,
  ),
};
