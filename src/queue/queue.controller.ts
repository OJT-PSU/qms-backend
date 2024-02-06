import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseEnumPipe,
  HttpCode,
} from '@nestjs/common';
import { QueueService } from './queue.service';
import { CreateQueueDto } from './dto/create-queue.dto';
import { QueueStatus } from '@prisma/client';
import { UpdateQueueDto } from './dto/update-queue.dto';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Post()
  @HttpCode(201)
  createQueueCustomer(@Body() createQueueDto: CreateQueueDto) {
    return this.queueService.createQueueCustomer(createQueueDto);
  }

  @Get()
  @HttpCode(200)
  findAllQueueCustomers() {
    return this.queueService.findAllQueueCustomers();
  }

  @Get(':queueStatus')
  @HttpCode(200)
  findFilteredQueueCustomers(
    @Param('queueStatus', new ParseEnumPipe(QueueStatus))
    queueStatus: QueueStatus,
  ) {
    return this.queueService.findFilteredQueueCustomers(queueStatus);
  }

  @Patch()
  @HttpCode(200)
  updateQueueCustomer(@Body() params: UpdateQueueDto) {
    return this.queueService.updateQueueCustomer(
      params.queueId,
      params.queueStatus,
      params.terminal,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.queueService.remove(+id);
  }
}
