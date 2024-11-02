import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import ApiDocs from './docs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger Configurations
  ApiDocs('docs', app);

  // Global Prefix and Pipes
  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  console.log('App is running on http://localhost:3000');
  await app.listen(3000);
}
bootstrap();
