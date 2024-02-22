import { Module } from '@nestjs/common';
import { DisplayService } from './display.service';
import { DisplayController } from './display.controller';
import { PrismaService } from 'src/prisma.service';
import { EventsGateway } from 'src/events/events.gateway';
import { QueueService } from 'src/queue/queue.service';

PrismaService;
@Module({
  controllers: [DisplayController],
  providers: [DisplayService, PrismaService, EventsGateway, QueueService],
})
export class DisplayModule {}
