import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { BooksModule } from './books/books.module.js';
import { AuthModule } from './auth/auth.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
     TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),

        // Otomatis membaca semua file *.entity.ts yang terdaftar di forFeature
        autoLoadEntities: true,

        // HANYA AKTIF SAAT TAHAP DEVELOPMENT! DILARANG TRUE DI PRODUCTION!
        synchronize: configService.get<string>('NODE_ENV') === 'development',
      }),
    }),
    BooksModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        NODE_ENV: Joi.string()
        .valid('development','staging','production')
        .default('development'),
        DB_HOST:Joi.string().required(),
        DB_PORT:Joi.number().default(5432),
        DB_USERNAME:Joi.string().required(),
        DB_PASSWORD:Joi.string().default(123),
        DB_DATABASE:Joi.string().required(),
      })
    }),
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
