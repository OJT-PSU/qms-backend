import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseEnumPipe,
} from '@nestjs/common';
import { QueueService } from './queue.service';
import { CreateQueueDto } from './dto/create-queue.dto';
import { QueueStatus } from '@prisma/client';
import { UpdateQueueDto } from './dto/update-queue.dto';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Post()
  createQueueCustomer(@Body() createQueueDto: CreateQueueDto) {
    return this.queueService.createQueueCustomer(createQueueDto);
  }

  @Get()
  findAllQueueCustomers() {
    return this.queueService.findAllQueueCustomers();
  }

  @Get(':queueStatus')
  findFilteredQueueCustomers(
    @Param('queueStatus', new ParseEnumPipe(QueueStatus))
    queueStatus: QueueStatus,
  ) {
    return this.queueService.findFilteredQueueCustomers(queueStatus);
  }

  @Patch()
  async updateQueueCustomerStatus(@Body() params: UpdateQueueDto) {
    return this.queueService.updateQueueCustomerStatus(params.queueId, {
      queueStatus: params.queueStatus,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.queueService.remove(+id);
  }
}
