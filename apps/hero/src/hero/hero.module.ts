import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { HeroController } from './hero.controller'

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'KAFKA_CLIENT',
                transport: Transport.KAFKA,
                options: {
                    subscribe: { fromBeginning: true },
                    client: {
                        clientId: 'hero',
                        brokers: ['localhost:29092']
                    },
                    consumer: {
                        allowAutoTopicCreation: true,
                        groupId: 'consumer'
                    }
                }
            }
        ])
    ],
    controllers: [HeroController]
})
export class HeroModule {}
