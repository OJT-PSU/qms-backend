import { PartialType } from '@nestjs/mapped-types';
import { CreateQueueDto } from './create-queue.dto';
import { QueueStatus } from '../interfaces/dto';
import { IsNumber, IsIn, IsString } from 'class-validator';

export class UpdateQueueDto extends PartialType(CreateQueueDto) {
  @IsNumber()
  queueId: number;

  @IsIn(['waiting', 'accommodated', 'ongoing'])
  queueStatus: QueueStatus;

  @IsString()
  terminal: string;
}
