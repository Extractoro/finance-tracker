import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import validationPipesConfig from './configs/validation-pipes.config';
import corsConfig from './configs/cors.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(corsConfig);
  app.useGlobalPipes(new ValidationPipe(validationPipesConfig));

  await app.listen(process.env.PORT ?? 3300);
}
bootstrap();
