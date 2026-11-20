import { NestFactory } from '@nestjs/core';
import { grpcOptions } from '@recipes/contracts/grpc';

import { AppModule } from './app.module.js';
import { config } from './config.js';

async function bootstrap() {
  // A gRPC server instead of an HTTP one: the contract comes from user.proto
  const app = await NestFactory.createMicroservice(
    AppModule,
    grpcOptions('user', config.grpcUrl),
  );
  app.enableShutdownHooks();
  await app.listen();
}
await bootstrap();
