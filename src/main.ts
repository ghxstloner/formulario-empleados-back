import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const corsOrigin = configService.get<string>('CORS_ORIGIN', 'http://localhost:4200');
  const port = configService.get<number>('PORT', 3000); 

  app.enableCors({
    origin: corsOrigin,
  });

  await app.listen(port);
  console.log(`Aplicación corriendo en http://localhost:${port}`);
}
bootstrap();
