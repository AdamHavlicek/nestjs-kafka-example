import { Module } from '@nestjs/common'
import { KingController } from './king.controller'
import { ClientsModule, Transport } from '@nestjs/microservices'

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'KAFKA_CLIENT',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: 'king',
                        brokers: ['localhost:29092'],

                    },
                    producer: {
                        allowAutoTopicCreation: true
                    },
                    consumer: {groupId: 'producer'},
                    subscribe: {fromBeginning: true}
                }
            }
        ])
    ],
    controllers: [KingController]
})
export class KingModule {}
