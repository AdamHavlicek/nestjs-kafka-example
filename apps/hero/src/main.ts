import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { kafkaClientOptions } from 'apps/kafka-client.options';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.connectMicroservice<MicroserviceOptions>(kafkaClientOptions)

  await app.startAllMicroservicesAsync()
  await app.listen(3001)
  Logger.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap();
