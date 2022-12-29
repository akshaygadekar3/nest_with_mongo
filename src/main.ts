import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: false,
    }),
  );
  app.useGlobalInterceptors(
    new SanitizeMongooseModelInterceptor({
      excludeMongooseId: false,
      excludeMongooseV: false,
    }), new TransformInterceptor()
  );
  await app.listen(process.env.APP_PORT);
}
bootstrap();
