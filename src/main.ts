import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const portNumber = 3001;
  await app.listen(portNumber);
  console.log('IoT API Running on:', `http://localhost:${portNumber}`);
}
bootstrap();
