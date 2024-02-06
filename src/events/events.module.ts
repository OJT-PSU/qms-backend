import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { QueueService } from 'src/queue/queue.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  providers: [EventsGateway, QueueService, PrismaService],
  exports: [EventsGateway],
})
export class EventsModule {}
