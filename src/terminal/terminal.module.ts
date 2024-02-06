import { Module } from '@nestjs/common';
import { TerminalService } from './terminal.service';
import { PrismaService } from 'src/prisma.service';
import { TerminalController } from './terminal.controller';

@Module({
  controllers: [TerminalController],
  providers: [TerminalService, PrismaService],
})
export class TerminalModule {}
