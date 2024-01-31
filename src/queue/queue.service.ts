import { Injectable } from '@nestjs/common';
import { CreateQueueDto } from './dto/create-queue.dto';
import { UpdateQueueDto } from './dto/update-queue.dto';
import { QueueStatus } from './interfaces/dto';

@Injectable()
export class QueueService {
  createQueueCustomer(createQueueDto: CreateQueueDto) {
    return 'This action adds a new queue';
  }

  findQueueCustomers(queueStatus: QueueStatus | 'None' = 'None') {
    return `This action returns all queue`;
  }

  findOneQueueCustomer(id: number) {
    return `This action returns a #${id} queue`;
  }

  updateQueueCustomer(id: number, updateQueueDto: UpdateQueueDto) {
    return `This action updates a #${id} queue`;
  }

  remove(id: number) {
    return `This action removes a #${id} queue`;
  }
}
