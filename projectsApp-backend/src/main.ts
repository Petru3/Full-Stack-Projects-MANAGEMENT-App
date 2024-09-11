import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const serverConfig = config.get('server');
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  // Activare CORS
  app.enableCors({
    origin: '*', // Permite toate originile; în producție ar trebui să specifici doar originile permise
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  const port = serverConfig.port || 3000;
  await app.listen(port);
  logger.log(`Application successfully deployed on port ${port}!`);
}
bootstrap();
