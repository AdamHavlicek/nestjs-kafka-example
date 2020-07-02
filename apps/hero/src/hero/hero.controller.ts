import { Controller, OnModuleInit, Logger, Get, Inject } from '@nestjs/common'
import {
    ClientKafka,
    MessagePattern,
    Payload,
    KafkaContext,
    Ctx
} from '@nestjs/microservices'
import { KafkaMessage } from '@nestjs/microservices/external/kafka-options.interface'

@Controller('hero')
export class HeroController implements OnModuleInit {
    constructor(
        @Inject('KAFKA_CLIENT') private readonly clientKafka: ClientKafka
    ) {}

    async onModuleInit() {
        await this.clientKafka.connect()
    }

    @MessagePattern('hero.get')
    get(@Payload() message: KafkaMessage, @Ctx() context: KafkaContext): any {
        Logger.error(`Topic ${context.getTopic()}`)
        const value = `Received a request from ${message.value}`
        Logger.error(value)
        return value
    }

    @Get()
    setRequest() {
        const result = this.clientKafka.send<string>('hero.get', 'Hero')
        return result
    }
}
