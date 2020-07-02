import { Controller, Get, OnModuleInit, Inject, Logger, Body, Param } from '@nestjs/common'
import { ClientKafka, MessagePattern } from '@nestjs/microservices'

@Controller('king')
export class KingController implements OnModuleInit {
    constructor(@Inject('KAFKA_CLIENT') private readonly clientKafka: ClientKafka) {}

    async onModuleInit() {
        this.clientKafka.subscribeToResponseOf('hero.get')
        await this.clientKafka.connect()
    }
    
    @Get(':name')
    request(@Param() params) {
        const result = this.clientKafka.send('hero.get', `King ${params.name}`)
        return result
    }

}
