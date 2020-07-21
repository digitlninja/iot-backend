import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config';
import { ENVIRONMENT } from './constants';
const { database, server } = config[ENVIRONMENT];

async function bootstrap() {
  // Add node-fetch to globals (used in interfacing with aws)
  global['fetch'] = require('node-fetch');

  const app = await NestFactory.create(AppModule);
  await app.listen(server.port);

  console.log(
    '[ThreeSprints IoT API Running on]:',
    `http://${server.host}:${server.port} - [Environment: ${ENVIRONMENT}]`,
  );
  console.log('[Connected to DB]:', database.url);
}
bootstrap();
