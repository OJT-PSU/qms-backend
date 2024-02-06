import { Module } from '@nestjs/common';
import { DisplayService } from './display.service';
import { DisplayController } from './display.controller';
import { PrismaService } from 'src/prisma.service';
PrismaService;
@Module({
  controllers: [DisplayController],
  providers: [DisplayService, PrismaService],
})
export class DisplayModule {}
