import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { TransformResponseInterceptor } from './interseptors/transform.response/transform.response.interceptor.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // 1. WHITELIST: Otomatis membuang semua properti yang TIDAK DIDEKLARASIKAN di DTO
      whitelist: true,

      // 2. FORBID NON-WHITELISTED: Langsung tolak request dengan error 400 jika ada properti asing
      forbidNonWhitelisted: true,

      // 3. TRANSFORM: Mengonversi objek mentah menjadi instance asli dari class DTO
      transform: true,
      transformOptions: {
        enableImplicitConversion: true, // Otomatis mengubah string ke number/boolean jika tipe di DTO number/boolean
      },
    }),
  )
  app.useGlobalInterceptors(new TransformResponseInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
