import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "reflect-metadata";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setBaseViewsDir(__dirname);
  app.setViewEngine('hbs');
  app.useStaticAssets(__dirname);
  await app.listen(3000);
}
bootstrap();
