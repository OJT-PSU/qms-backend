import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { QueueController } from './queue.controller';
import { PrismaService } from 'src/prisma.service';
import { EventsGateway } from 'src/events/events.gateway';

@Module({
  controllers: [QueueController],
  imports: [],
  providers: [QueueService, PrismaService, EventsGateway],
  exports: [QueueService],
})
export class QueueModule {}
