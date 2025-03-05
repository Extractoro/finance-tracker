import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import validationPipesConfig from './configs/validation-pipes.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(validationPipesConfig));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
