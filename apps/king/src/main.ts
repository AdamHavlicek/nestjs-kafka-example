import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { kafkaClientOptions } from 'apps/kafka-client.options';
import { KingModule } from './king.module';

async function bootstrap() {
  const app = await NestFactory.create(KingModule)

  await app.listen(3002)
  Logger.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap();
