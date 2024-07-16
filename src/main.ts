import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import { static as express_static, json, urlencoded } from 'express';
import helmet from 'helmet';
import * as path from 'path';
import { AppModule } from './app.module';
import { ServiceProperties } from './common/common.constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PATCH,POST,OPTIONS',
    credentials: true,
  });
  app.use(json({ limit: '100mb' }));
  app.use(urlencoded({ extended: true, limit: '100mb' }));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  app.use(cookieParser());
  app.use(
    helmet({
      contentSecurityPolicy: false,
      dnsPrefetchControl: { allow: false },
      referrerPolicy: { policy: 'no-referrer-when-downgrade' },
      frameguard: { action: 'sameorigin' },
      permittedCrossDomainPolicies: { permittedPolicies: 'none' },
      xssFilter: true,
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );
  app.use(express_static(path.resolve('src/cdn')));
  app.use(compression());
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');
  await app.listen(PORT);
  Logger.log(`Running on PORT ~ ${PORT}`, ServiceProperties['name']);
}
bootstrap();
