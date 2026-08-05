import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

import { GlobalExceptionFilter } from './core/presentation/filters/global-exception.filter';
import { ResponseInterceptor } from './core/presentation/interceptors/response.interceptor';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  /**
   * API Prefix
   */
  app.setGlobalPrefix('api');

  /**
   * Global Validation
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      stopAtFirstError: false,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  /**
   * Global Response Wrapper
   */
  app.useGlobalInterceptors(new ResponseInterceptor());

  /**
   * Global Exception Filter
   */
  app.useGlobalFilters(new GlobalExceptionFilter());

  /**
   * CORS
   */
  app.enableCors({
    origin: true,
    credentials: true,
  });

  /**
   * Swagger
   */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Beer Control API')
    .setDescription('REST API for Beer Control ERP Platform')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('docs', app, swaggerDocument, {
    customSiteTitle: 'Beer Control API',
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      docExpansion: 'none',
    },
  });

  /**
   * Start Application
   */
  const port = Number(process.env.PORT) || 3000;

  await app.listen(port);

  console.log(`
==================================================
🍺 Beer Control API
==================================================
Environment : ${process.env.NODE_ENV ?? 'development'}
Port        : ${port}
API         : http://localhost:${port}/api
Swagger     : http://localhost:${port}/docs
==================================================
`);
}

void bootstrap();
