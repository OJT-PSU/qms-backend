import { PartialType } from '@nestjs/mapped-types';
import { CreateQueueDto } from './create-queue.dto';
import { QueueStatus } from '../interfaces/dto';

export class UpdateQueueDto extends PartialType(CreateQueueDto) {
  queueStatus: QueueStatus;
}
